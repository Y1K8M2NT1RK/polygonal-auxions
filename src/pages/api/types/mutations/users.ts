import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows } from '../consts';
import { cookieModule } from '../consts';

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