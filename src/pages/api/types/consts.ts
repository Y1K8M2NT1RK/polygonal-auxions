import { builder } from '../builder';

export const User = builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        slug_id: t.exposeString('slug_id'),
        name_kana: t.exposeString('name_kana', {nullable: true}),
        handle_name: t.exposeString('handle_name'),
        email: t.exposeString('email'),
        introduction: t.exposeString('introduction'),
        address: t.exposeString('address'),
        created_at: t.expose('created_at', {type: 'Date'}),
        artworks: t.relation('artworks'),
        comments: t.relation('comments'),
        following: t.relation('following'),
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