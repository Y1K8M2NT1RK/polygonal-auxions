import { builder } from '../../builder';
import { prisma } from '../../../db';
import { User, userIncludeFile, AdminUsersListResponse } from '../consts';

// ユーザープロフィール
builder.queryField("UserProfile", (t) =>
  t.prismaField({
    type: User,
    args: { handle_name: t.arg.string({ required: true }) },
    resolve: (query, _parent, args) => prisma.user.findUniqueOrThrow({
      ...query,
      where: { handle_name: args.handle_name },
      include: {
        user_files: {
          where: { OR: [{ purpose_id: 1 }, { purpose_id: 2 }] },
          orderBy: { created_at: 'desc' },
        },
        artworks: { orderBy: { created_at: 'desc' }, include: { artwork_file: true } },
        comments: { orderBy: { created_at: 'desc' } }
      }
    })
  })
);

builder.queryField("getMyTotalFavorites", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      return prisma.artworkRanks.count({ where: { rank_id: 3, artwork: { user_id: userId } } });
    },
  })
);

builder.queryField("getMyTotalBookmarks", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      return prisma.artworkRanks.count({ where: { rank_id: 4, artwork: { user_id: userId } } });
    },
  })
);

builder.queryField("me", (t) =>
  t.prismaField({
    type: User,
    authScopes: { isAuthenticated: true },
    resolve: (query, _parent, _args, ctx) => prisma.user.findUniqueOrThrow({ ...query, where: { id: ctx.auth?.id } }),
  })
);

builder.queryField("getFollowingUser", (t) =>
  t.prismaField({
    type: [User]!,
    authScopes: { isAuthenticated: true },
    resolve: (query, _parent, _args, ctx) => prisma.user.findMany({
      ...query,
      where: { following: { some: { followed_by_id: ctx.auth?.id as number } } },
    }),
  })
);

builder.queryField("getFollowedByUser", (t) =>
  t.prismaField({
    type: [User]!,
    authScopes: { isAuthenticated: true },
    resolve: (query, _parent, _args, ctx) => prisma.user.findMany({
      ...query,
      where: { followed_by: { some: { following_id: ctx.auth?.id as number } } },
    }),
  })
);

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

builder.queryField("adminUsersList", (t) =>
  t.field({
    type: AdminUsersListResponse,
    authScopes: { isAdmin: true },
    args: {
      page: t.arg.int({ required: false, defaultValue: 1 }),
      limit: t.arg.int({ required: false, defaultValue: 10 }),
      search: t.arg.string({ required: false }),
    },
    resolve: async (_parent, args) => {
      const page = Math.max(args.page || 1, 1);
      const limit = Math.min(Math.max(args.limit || 10, 1), 100);
      const offset = (page - 1) * limit;
      const where: any = { role: 'USER' };
      if (args.search) {
        const s = args.search.trim();
        where.OR = [
          { handle_name: { contains: s, mode: 'insensitive' } },
          { name: { contains: s, mode: 'insensitive' } },
          { email: { contains: s, mode: 'insensitive' } },
        ];
      }
      const [users, totalCount] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: offset,
          take: limit,
          orderBy: { created_at: 'desc' },
          select: {
            id: true, handle_name: true, name: true, name_kana: true, email: true,
            phone_number: true, address: true, introduction: true, birthday: true,
            role: true, created_at: true, updated_at: true,
          },
        }),
        prisma.user.count({ where }),
      ]);
      return { users, totalCount, hasNextPage: totalCount > offset + limit, hasPreviousPage: page > 1 };
    },
  })
);

builder.queryField("adminUserDetail", (t) =>
  t.prismaField({
    type: User,
    authScopes: { isAdmin: true },
    args: { id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args) => prisma.user.findUniqueOrThrow({
      ...query,
      where: { id: parseInt(args.id) },
      include: {
        user_files: { orderBy: { created_at: 'desc' } },
        artworks: { orderBy: { created_at: 'desc' }, take: 10, include: { artwork_file: true } },
        comments: { orderBy: { created_at: 'desc' }, take: 10, include: { artwork: { select: { slug_id: true, title: true } } } },
      },
    })
  })
);
