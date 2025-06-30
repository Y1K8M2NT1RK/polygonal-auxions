import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows, User } from '../consts';
import { cookieModule } from '../consts';
import { ImageInput } from '../consts';

builder.mutationField("login", (t) => 
    t.prismaField({
        type: AuthPayload,
        errors: { types: [ZodError], },
        args: {
            email: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                    refine: [
                        async (val) => {
                            if( val == "" ) return true;
                            return !!(await prisma.user.findUnique({where: {email: val},}));
                        },
                        {message: '入力した情報からユーザが確認できません。'}
                    ],
                },
            }),
            password: t.arg.string({
                required: true,
                validate: {
                    type: 'string',
                    maxLength: [100, {message: '文字数が多すぎます。'}],
                    minLength: [1, {message: '入力してください。'}],
                },
            }),
        },
        validate: [
            async (args) => {
                const user = await prisma.user.findUnique({where: {email: args?.email},});
                const saltRounds = 10;
                const salt = genSaltSync(saltRounds);
                const hashedPassword = hashSync(user?.password || '', salt);
                return compareSync(args.password, hashedPassword);
            },
            {message: 'パスワードが違います。', path: ['password']},
        ],
        resolve: async (_query, _parent, args, ctx) => {
            const user = await prisma.user.findUnique({where: {email: args.email},});
            if (!user) throw new Error();
            return cookieModule.setCookie(user.id, ctx);
        },
    })
);

builder.mutationField("refresh", (t) => 
    t.prismaField({
        type: AuthPayload,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        resolve: async (_query, _parent, _args, ctx) => {
            const authPayload = cookieModule.setCookie(ctx?.auth?.id as number, ctx);
            if ( !authPayload) {
                cookieModule.deleteCookie(ctx);
                throw new Error('User not found');
            }
            return authPayload;
        },
    })
);

builder.mutationField("updateMyProfile", (t) =>
    t.prismaField({
        type: User,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        args: {
            name: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [25, {message: '文字数が多すぎます。'}],},
            }),
            name_kana: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [50, {message: '文字数が多すぎます。'}],},
            }),
            birthday: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    refine: [
                        (val: string) => {
                            const date = new Date(val);
                            return !isNaN(date.getTime());
                        },
                        {message: '日付の形式が正しくありません。'}
                    ],
                },
            }),
            introduction: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [500, {message: '文字数が多すぎます。'}],},
            }),
            phone_number: t.arg.string({
                required: false,
                validate: {
                    type: 'string',
                    maxLength: [15, {message: '文字数が多すぎます。'}],
                    refine: [
                        (val: string) => ((/^\d+$/).test(val)),
                        {message: '電話番号は数字のみで入力してください。'}
                    ],
                },
            }),
            address: t.arg.string({
                required: false,
                validate: {type: 'string', maxLength: [150, {message: '文字数が多すぎます。'}],},
            }),
            bg: t.arg({ type: ImageInput, required: false, }),
            icon: t.arg({ type: ImageInput, required: false, })
        },
        resolve: async (_query, _parent, args, ctx) => {
            return prisma.user.update({
                where: { id: ctx.auth?.id as number },
                data: {
                    name: args?.name ?? '',
                    name_kana: args?.name_kana ?? '',
                    birthday: args?.birthday ? new Date(args?.birthday) : '',
                    introduction: args?.introduction ?? '',
                    phone_number: args?.phone_number ?? '',
                    address: args?.address ?? '',
                    user_files: {
                        createMany: {
                            data: [
                                {
                                    purpose_id: 1,
                                    file_path: args?.bg?.url ?? '',
                                    file_name: args?.bg?.url?.split('/').pop(),
                                    extension: args?.bg?.content_type?.split('/')[1] ?? '',
                                },
                                {
                                    purpose_id: 2,
                                    file_path: args?.icon?.url ?? '',
                                    file_name: args?.icon?.url?.split('/').pop(),
                                    extension: args?.icon?.content_type?.split('/')[1] ?? '',
                                }
                            ],
                        },
                    },
                },
            })
        },
    })
)

builder.mutationField("logout", (t) => 
    t.boolean({
        authScopes: { isAuthenticated: true, },
        resolve: async (_query, _parent, ctx) => {
            try { 
                return cookieModule.deleteCookie(ctx);
            } catch (error) {
                console.error('Logout error:', error);
                return false;
            }
        },
    })
)

// フォロー・フォロー解除
builder.mutationField('followOrUnfollow', (t) => 
    t.prismaField({
        type: Follows,
        authScopes: { isAuthenticated: true, },
        args: { following_id: t.arg.string({required: true,}), mode: t.arg.string({required: true,}) },
        resolve: async (query, _parent, args, ctx, _info) => {
            if(args.mode == 'follow'){ return prisma.follow.create({
                ...query,
                data: {
                    following: { connect: { id: parseInt(args.following_id) } },
                    followedBy: { connect: { id: ctx?.auth?.id } }
                },
            })}else if(args.mode == 'unfollow'){ return prisma.follow.delete({
                where: {
                    following_id_followed_by_id: {
                        following_id: parseInt(args.following_id),
                        followed_by_id: ctx?.auth?.id as number,
                    }
                },
            })}else{
                throw new Error('follow error');
            }
        }
    })
);