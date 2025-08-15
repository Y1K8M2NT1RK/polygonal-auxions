import { builder } from '../../builder';
import { prisma } from '../../db';
import { User, userIncludeFile, AdminUsersListResponse } from '../consts';

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

// 自分の作品に対する「お気に入り(=いいね)」合計数を取得（認証必須）
builder.queryField("getMyTotalFavorites", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      const count = await prisma.artworkRanks.count({
        where: { rank_id: 3, artwork: { user_id: userId } },
      });
      return count;
    },
  })
);

// 自分の作品に対する「ブックマーク」合計数を取得（認証必須）
builder.queryField("getMyTotalBookmarks", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      const count = await prisma.artworkRanks.count({
        where: { rank_id: 4, artwork: { user_id: userId } },
      });
      return count;
    },
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
        where: { id: ctx.auth?.id },
      });
    },
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

// 自分が行った「お気に入り」合計（=他者作品・自作品問わず、rank_id=3 で user_id=自分）
builder.queryField("getMyFavoritesGiven", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      return prisma.artworkRanks.count({ where: { rank_id: 3, user_id: userId } });
    },
  })
);

// 自分が行った「ブックマーク」合計（=rank_id=4 で user_id=自分）
builder.queryField("getMyBookmarksGiven", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      return prisma.artworkRanks.count({ where: { rank_id: 4, user_id: userId } });
    },
  })
);

// Admin User Management Queries
builder.queryField("adminUsersList", (t) =>
  t.field({
    type: AdminUsersListResponse,
    authScopes: { isAdmin: true },
    args: {
      page: t.arg.int({ required: false, defaultValue: 1 }),
      limit: t.arg.int({ required: false, defaultValue: 10 }),
      search: t.arg.string({ required: false }),
    },
    resolve: async (_parent, args, _ctx) => {
      const page = Math.max(args.page || 1, 1);
      const limit = Math.min(Math.max(args.limit || 10, 1), 100);
      const offset = (page - 1) * limit;

      // Build where clause for search and USER role filter
      const where: any = {
        role: 'USER', // Only show USER role users
      };

      if (args.search) {
        const searchTerm = args.search.trim();
        where.OR = [
          { handle_name: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
        ];
      }

      // Get users and total count
      const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            id: true,
            handle_name: true,
            name: true,
            name_kana: true,
            email: true,
            phone_number: true,
            address: true,
            introduction: true,
            birthday: true,
            role: true,
            created_at: true,
            updated_at: true,
          },
        }),
        prisma.user.count({ where }),
      ]);

      return {
        users,
        totalCount,
        hasNextPage: totalCount > offset + limit,
        hasPreviousPage: page > 1,
      };
    },
  })
);

builder.queryField("adminUserDetail", (t) =>
  t.prismaField({
    type: User,
    authScopes: { isAdmin: true },
    args: { id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args, _ctx) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: parseInt(args.id) },
        include: {
          user_files: {
            orderBy: { created_at: 'desc' },
          },
          artworks: {
            orderBy: { created_at: 'desc' },
            take: 10,
            include: { artwork_file: true },
          },
          comments: {
            orderBy: { created_at: 'desc' },
            take: 10,
            include: {
              artwork: {
                select: { slug_id: true, title: true }
              }
            }
          },
        },
      });
    },
  })
);