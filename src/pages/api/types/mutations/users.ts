import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows, User } from '../consts';
import { cookieModule } from '../consts';
import { ImageInput } from '../consts';
import { del } from '@vercel/blob';

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
            let targetExistedFile = null;
            let updateData: { createMany: { data: any[] } } = { createMany: { data: [] } };
            let userFiles = null;
            for(const val of [{key: 1, files: args.bg,}, {key: 2, files: args.icon,}]) {
                userFiles = val.files;
                if (!userFiles) continue;
                if( userFiles.current_image_url && userFiles.image_url && userFiles.content_type ){
                    await del(userFiles.current_image_url as string, {token: process.env.BLOB_READ_WRITE_TOKEN});
                }
                targetExistedFile = await prisma.userFiles.findFirst({
                    where: { file_path: userFiles.current_image_url as string, },
                });
                if ((
                        (!!userFiles?.image_url && !!userFiles?.content_type)
                    ||  userFiles.is_image_deleted==true
                ) && !!targetExistedFile ) {
                    await prisma.userFiles.delete({where: {id: targetExistedFile?.id}});
                }
                if(!!userFiles?.image_url && !!userFiles?.content_type && userFiles?.is_image_deleted != true) {
                    updateData.createMany.data.push({
                        purpose_id: val.key,
                        file_path: userFiles.image_url,
                        file_name: userFiles.image_url.split('/').pop(),
                        extension: userFiles.content_type.split('/')[1] ?? '',
                    });
                }
            }
            return prisma.user.update({
                where: { id: ctx.auth?.id as number },
                data: {
                    name: args?.name ?? '',
                    name_kana: args?.name_kana ?? '',
                    birthday: args?.birthday ? new Date(args?.birthday) : '',
                    introduction: args?.introduction ?? '',
                    phone_number: args?.phone_number ?? '',
                    address: args?.address ?? '',
                    user_files: updateData,
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