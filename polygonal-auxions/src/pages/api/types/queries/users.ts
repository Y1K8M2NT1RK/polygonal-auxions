import { builder } from '../../builder';
import { prisma } from '../../db';
import { User } from '../../types/consts';

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