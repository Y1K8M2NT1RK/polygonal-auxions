import { builder } from '../builder';
import { prisma } from '../db';
// cookie / auth helpers moved to cookie.ts

// UserRole enum
export const UserRole = builder.enumType('UserRole', {
    values: ['USER', 'ADMIN', 'MODERATOR'] as const,
});

export const User = builder.prismaObject('User', {
    fields: (t: any) => ({
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
        // Prisma の select に含まれないケースでも安全に返す
        role: t.field({
            type: UserRole,
            resolve: (user: any) => (user?.role as any) ?? 'USER',
        }),
        created_at: t.expose('created_at', {type: 'Date'}),
    updated_at: t.expose('updated_at', {type: 'Date'}),
        user_files: t.relation('user_files'),
        artworks: t.relation('artworks'),
        comments: t.relation('comments'),
        following: t.relation('following'),
    }),
});

export const UserFile = builder.prismaObject('UserFiles', {
    fields: (t: any) => ({
        id: t.exposeID('id'),
        user_id: t.exposeID('user_id'),
        purpose_id: t.exposeID('purpose_id'),
        file_path: t.exposeString('file_path'),
        created_at: t.expose('created_at', { type: 'Date' }),
        user: t.relation('user'),
    }),
});
  
export const AuthPayload = builder.prismaObject('AuthPayload', {
    fields: (t: any) => ({
        id: t.exposeID('id'),
    accessToken: t.exposeString('access_token'),
    expires_at: t.expose('expires_at', { type: 'Date' }),
        user: t.relation('user'),
    }),
});
  
export const Follows = builder.prismaObject('Follow', {
    fields: (t: any) => ({
        following: t.relation('following'),
        following_id: t.exposeID('following_id'),
        followed_by: t.relation('followedBy'),
        followed_by_id: t.exposeID('followed_by_id'),
    })
});

export const Artwork = builder.prismaObject('Artwork', {
    fields: (t: any) => ({
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
        // Computed fields for rank counts and auth-aware flags
        favoritesCount: t.int({
            resolve: async (artwork: any) =>
                prisma.artworkRanks.count({
                    where: { artwork_id: Number(artwork.id), rank_id: 3 },
                }),
        }),
        bookmarksCount: t.int({
            resolve: async (artwork: any) =>
                prisma.artworkRanks.count({
                    where: { artwork_id: Number(artwork.id), rank_id: 4 },
                }),
        }),
        isFavoritedByMe: t.boolean({
            resolve: async (artwork: any, _args: unknown, ctx: any) => {
                if (!ctx?.auth?.id) return false;
                const c = await prisma.artworkRanks.count({
                    where: {
                        artwork_id: Number(artwork.id),
                        user_id: ctx.auth.id,
                        rank_id: 3,
                    },
                });
                return c > 0;
            },
        }),
        isBookmarkedByMe: t.boolean({
            resolve: async (artwork: any, _args: unknown, ctx: any) => {
                if (!ctx?.auth?.id) return false;
                const c = await prisma.artworkRanks.count({
                    where: {
                        artwork_id: Number(artwork.id),
                        user_id: ctx.auth.id,
                        rank_id: 4,
                    },
                });
                return c > 0;
            },
        }),
     }),
});

export const ArtworkRanks = builder.prismaObject('ArtworkRanks', {
    fields: (t: any) => ({
        id: t.exposeID('id'),
        artwork_id: t.exposeID('artwork_id'),
        rank_id: t.exposeID('rank_id'),
        user_id: t.exposeID('user_id'),
    }),
});

export const ArtworkFile = builder.prismaObject('ArtworkFile', {
    fields: (t: any) => ({
        id: t.exposeID('id'),
        artwork_id: t.exposeID('artwork_id'),
        file_path: t.exposeString('file_path'),
    }),
});

export const Comment = builder.prismaObject('Comment', {
    fields: (t: any) => ({
        body: t.exposeString('body'),
        artwork_id: t.exposeID('artwork_id'),
        slug_id: t.exposeID('slug_id'),
        created_at: t.expose('created_at', {type: 'Date'}),
        user: t.relation('user'),
        artwork: t.relation('artwork'),
    }),
});

export const ImageInput = builder.inputType('ImageInput', {
    fields: (t: any) => ({
        is_image_deleted: t.boolean({defaultValue: false,}),
        current_image_url: t.string({defaultValue: ''}),
        image_url: t.string(),
        content_type: t.string(),
    }),
})

// Admin Users List Response Type
export const AdminUsersListResponse = builder.simpleObject('AdminUsersListResponse', {
    fields: (t: any) => ({
        users: t.field({ type: [User], required: true }),
        totalCount: t.int({ required: true }),
        hasNextPage: t.boolean({ required: true }),
        hasPreviousPage: t.boolean({ required: true }),
    }),
});

import { randomBytes } from 'crypto';

// (cookieModule removed from this file)

export const userIncludeFile = { include: { user_files: { where: { purpose_id: 2 } } } };