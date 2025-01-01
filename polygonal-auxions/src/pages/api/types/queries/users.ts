import { builder } from '../../builder';
import { prisma } from '../../db';

// メインのテーブル
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

// ユーザープロフィール
builder.queryField("user", (t) =>
  t.prismaField({
    type: User,
    args: { handle_name: t.arg.string({ required: true }), },
    resolve: (query, _parent, args, _ctx, _info) => 
      prisma.user.findUniqueOrThrow({
        ...query,
        where: { handle_name: args.handle_name },
        include: {
          artworks: { orderBy: { created_at : 'desc' }},
          comments: { orderBy: { created_at : 'desc' }}
        }
      }),
  })
);

// ログイン中のユーザー情報
builder.queryField("me", (t) =>
  t.prismaField({
    type: User,
    authScopes: { isAuthenticated: true, },
    resolve: (query, _parent, _args, ctx, _info) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: {id: ctx.auth?.id},
      })},
  })
);