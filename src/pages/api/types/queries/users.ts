import { builder } from '../../builder';
import { prisma } from '../../db';
import { User, userIncludeFile } from '../consts';

// ユーザープロフィール
builder.queryField("UserProfile", (t) =>
  t.prismaField({
    type: User,
    args: { handle_name: t.arg.string({ required: true }), },
    resolve: (query, _parent, args, _ctx, _info) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: { handle_name: args.handle_name },
        include: {
          user_files: {
            where: {
              OR: [
                { purpose_id: 1 }, // 1: アイコン
                { purpose_id: 2 }, // 2: 背景
              ]
            },
            orderBy: { created_at: 'desc' },
          },
          artworks: {
            orderBy: { created_at : 'desc' },
            include: { artwork_file: true }
          },
          comments: { orderBy: { created_at : 'desc' }}
        }
      });
    }
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
        ...userIncludeFile,
      })},
  })
);

builder.queryField("getFollowingUser", (t) =>
  t.prismaField({
    type: [User]!,
    authScopes: { isAuthenticated: true, },
    resolve: (query, _parent, _args, ctx, _info) => {
      return prisma.user.findMany({
        ...query,
        where: {
          following: {
            some: { followed_by_id: ctx.auth?.id as number }
          }
        },
      });
    },
  })
);

builder.queryField("getFollowedByUser", (t) =>
  t.prismaField({
    type: [User]!,
    authScopes: { isAuthenticated: true, },
    resolve: (query, _parent, _args, ctx, _info) => {
      return prisma.user.findMany({
        ...query,
        where: {
          followed_by: {
            some: { following_id: ctx.auth?.id as number }
          }
        }
      });
    },
  })
);