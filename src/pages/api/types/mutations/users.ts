import { builder } from '../../builder';
import { prisma } from '../../db';
import { ZodError } from 'zod';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { AuthPayload, Follows } from '../consts';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const cookieOptions: { token: object; refreshToken: object } = {
    token:  { name: 'token', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600,},
    refreshToken: { name: 'refreshToken', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 604800,}
}

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
            const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET??'', { expiresIn: '1h' });
            const refresh_token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET??'', { expiresIn: '7d' });
            const authPayload = await prisma.authPayload.upsert({
                where: { user_id: user.id },
                update: {access_token, refresh_token, expires_at: new Date(Date.now() + 15 * 60 * 1000),},
                create: {access_token, refresh_token, user_id: user.id, expires_at: new Date(Date.now() + 15 * 60 * 1000),},
            });
            ctx.res.setHeader('Set-Cookie', [
                serialize('token', access_token, cookieOptions.token),
                serialize('refreshToken', refresh_token, cookieOptions.refreshToken),
            ]);
            return authPayload;
        },
    })
);

builder.mutationField("refresh", (t) => 
    t.prismaField({
        type: AuthPayload,
        errors: { types: [ZodError], },
        authScopes: { isAuthenticated: true, },
        resolve: async (_query, _parent, _args, ctx) => {
            const authPayload = await prisma.authPayload.findUnique({
                where: {
                    user_id: ctx?.auth?.id as number,
                    refresh_token: ctx.req.cookies.refreshToken
                },
            });
            if ( !authPayload) {
                ctx.res.setHeader('Set-Cookie', [
                    serialize('token', '', { ...cookieOptions.token, maxAge: -1 }),
                    serialize('refreshToken', '', { ...cookieOptions.token, maxAge: -1 }),
                ]);
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
                await prisma.authPayload.delete({
                    where: { 
                        user_id: ctx?.auth?.id as number,
                        OR: [
                            { access_token: ctx.req.cookies.token },
                            { refresh_token: ctx.req.cookies.refreshToken }
                        ]},
                });
                ctx.res.setHeader('Set-Cookie', [
                    serialize('token', '', { ...cookieOptions.token, maxAge: -1 }),
                    serialize('refreshToken', '', { ...cookieOptions.token, maxAge: -1 }),
                ]);
                return true;
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