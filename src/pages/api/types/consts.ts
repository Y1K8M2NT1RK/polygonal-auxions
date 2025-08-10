import { builder } from '../builder';
import { prisma } from '../db';
import { SignJWT, jwtVerify } from 'jose';
import { serialize } from 'cookie';
import { YogaContext } from '../context';
import { AuthPayload as PrismaAuthPayloadType } from '../../../../prisma/generated/client';

export const User = builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        slug_id: t.exposeString('slug_id'),
        name_kana: t.exposeString('name_kana', {nullable: true}),
        handle_name: t.exposeString('handle_name'),
        email: t.exposeString('email'),
        introduction: t.exposeString('introduction'),
        phone_number: t.exposeString('phone_number', {nullable: true}),
        birthday: t.expose('birthday', {type: 'Date', nullable: true}),
        address: t.exposeString('address'),
        created_at: t.expose('created_at', {type: 'Date'}),
        user_files: t.relation('user_files'),
        artworks: t.relation('artworks'),
        comments: t.relation('comments'),
        following: t.relation('following'),
    }),
});

export const UserFile = builder.prismaObject('UserFiles', {
    fields: (t) => ({
        id: t.exposeID('id'),
        user_id: t.exposeID('user_id'),
        purpose_id: t.exposeID('purpose_id'),
        file_path: t.exposeString('file_path'),
        created_at: t.expose('created_at', { type: 'Date' }),
        user: t.relation('user'),
    }),
});
  
export const AuthPayload = builder.prismaObject('AuthPayload', {
    fields: (t) => ({
        id: t.exposeID('id'),
        accessToken: t.exposeString('access_token'),
        refreshToken: t.exposeString('refresh_token'),
        expires_at: t.expose('expires_at', { type: 'Date' }),
        user: t.relation('user'),
    }),
});
  
export const Follows = builder.prismaObject('Follow', {
    fields: (t) => ({
        following: t.relation('following'),
        following_id: t.exposeID('following_id'),
        followed_by: t.relation('followedBy'),
        followed_by_id: t.exposeID('followed_by_id'),
    })
});

export const Artwork = builder.prismaObject('Artwork', {
    fields: (t) => ({
        id: t.exposeID('id'),
        slug_id: t.exposeID('slug_id'),
        title: t.exposeString('title'),
        feature: t.exposeString('feature'),
        likes: t.exposeInt('likes'),
        bads: t.exposeInt('bads'),
        deleted: t.exposeBoolean('deleted'),
        created_at: t.expose('created_at', {type: 'Date'}),
        user: t.relation('user'),
        user_id: t.exposeID('user_id'),
        comments: t.relation('comments'),
        artwork_ranks: t.relation('artwork_ranks'),
        artwork_file: t.relation('artwork_file'),
     }),
});

export const ArtworkRanks = builder.prismaObject('ArtworkRanks', {
    fields: (t) => ({
        id: t.exposeID('id'),
        artwork_id: t.exposeID('artwork_id'),
        rank_id: t.exposeID('rank_id'),
        user_id: t.exposeID('user_id'),
    }),
});

export const ArtworkFile = builder.prismaObject('ArtworkFile', {
    fields: (t) => ({
        id: t.exposeID('id'),
        artwork_id: t.exposeID('artwork_id'),
        file_path: t.exposeString('file_path'),
    }),
});

export const Comment = builder.prismaObject('Comment', {
    fields: (t) => ({
        body: t.exposeString('body'),
        artwork_id: t.exposeID('artwork_id'),
        slug_id: t.exposeID('slug_id'),
        created_at: t.expose('created_at', {type: 'Date'}),
        user: t.relation('user'),
        artwork: t.relation('artwork'),
    }),
});

export const ImageInput = builder.inputType('ImageInput', {
    fields: (t) => ({
        is_image_deleted: t.boolean({defaultValue: false,}),
        current_image_url: t.string({defaultValue: ''}),
        image_url: t.string(),
        content_type: t.string(),
    }),
})

export const cookieModule: {
    token: object;
    refreshToken: object;
    setCookie: (user_id: number, context: YogaContext) => Promise<PrismaAuthPayloadType>;
    deleteCookie: (context: YogaContext) => Promise<boolean>;
} = {
    token:  { name: 'token', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600,},
    refreshToken: { name: 'refreshToken', httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 604800,},
    setCookie: async (user_id: number, context: YogaContext) => {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
        const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET ?? '');
        const now = Math.floor(Date.now() / 1000);
        const access_token = await new SignJWT({ id: user_id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt(now)
            .setExpirationTime('1h')
            .sign(secret);
        const refresh_token = await new SignJWT({ id: user_id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt(now)
            .setExpirationTime('7d')
            .sign(refreshSecret);
        const authPayload = await prisma.authPayload.upsert({
            where: { user_id: user_id },
            update: {access_token, refresh_token, expires_at: new Date(Date.now() + 15 * 60 * 1000),},
            create: {access_token, refresh_token, user_id: user_id, expires_at: new Date(Date.now() + 15 * 60 * 1000),},
        });
        context.res.setHeader('Set-Cookie', [
            serialize('token', access_token, cookieModule.token),
            serialize('refreshToken', refresh_token, cookieModule.refreshToken),
        ]);
        return authPayload;
    },
    deleteCookie: async (context: YogaContext) => {
        await prisma.authPayload.delete({
            where: { 
                user_id: context?.auth?.id as number,
                OR: [
                    { access_token: context.req.cookies.token },
                    { refresh_token: context.req.cookies.refreshToken }
                ]},
        });
        context.res.setHeader('Set-Cookie', [
            serialize('token', '', { ...cookieModule.token, maxAge: -1 }),
            serialize('refreshToken', '', { ...cookieModule.token, maxAge: -1 }),
        ]);
        return true;
    },
}

export const userIncludeFile = { include: { user_files: { where: { purpose_id: 2 } } } };