import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Artwork, ArtworkRanks, Ranks, userIncludeFile } from '../consts';

// 作品一覧
builder.queryField("artworks", (t) =>
  t.prismaField({
    type: [Artwork],
    args: {
      q: t.arg.string({ required: false }),
      offset: t.arg.int({ required: false, defaultValue: 0 }),
      limit: t.arg.int({ required: false, defaultValue: 18 }),
    },
    resolve: (query, _parent, args) =>  {
      const keywords = (args.q || '').split(/\s+/).map(s => s.trim()).filter(Boolean);
      const skipCount = args.offset ?? 0;
      const takeCount = args.limit ?? 18;
      return prisma.artwork.findMany({
        ...query,
        where: {
          AND: keywords.map(keyword => ({
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { feature: { contains: keyword, mode: 'insensitive' } },
              { user: { handle_name: { contains: keyword, mode: 'insensitive' } } }
            ]
          })),
        },
        orderBy: { created_at: 'desc' },
        include: { artwork_file: true, user: true },
        skip: skipCount,
        take: takeCount,
      });
    },
  })
);

// 作品の総数 (検索条件反映)
builder.queryField("artworksCount", (t) =>
  t.field({
    type: 'Int',
    args: { q: t.arg.string({ required: false }) },
    resolve: (_parent, args) => {
      const keywords = (args.q || '').split(/\s+/).map(s => s.trim()).filter(Boolean);
      return prisma.artwork.count({
        where: {
          AND: keywords.map(keyword => ({
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { feature: { contains: keyword, mode: 'insensitive' } },
              { user: { handle_name: { contains: keyword, mode: 'insensitive' } } }
            ]
          })),
        },
      });
    },
  })
);

// ログインユーザのお気に入り/ブックマーク
builder.queryField("getAuthArtworkRanks", (t) =>
  t.prismaField({
    type: [ArtworkRanks],
    authScopes: { isAuthenticated: true },
    args: { artwork_id: t.arg.string({ required: false }) },
    resolve: (query, _parent, args, ctx) =>
      prisma.artworkRanks.findMany({
        ...query,
        where: { 
          ...(args.artwork_id ? { artwork_id: parseInt(args.artwork_id) } : {}),
          user_id: ctx.auth?.id,
          rank_id: { in: [3, 4] }
        }
      })
  })
);

// 作品詳細
builder.queryField("artwork", (t) =>
  t.prismaField({
    type: Artwork,
    args: { slug_id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args) =>
      prisma.artwork.findUniqueOrThrow({
        ...query,
        where: { slug_id: args.slug_id },
        include: {
          comments: { orderBy: { created_at: 'desc' } },
          artwork_file: true,
          user: userIncludeFile
        }
      }),
  })
);

// お気に入り/ブックマーク数一覧
builder.queryField("getArtworkRanks", (t) =>
  t.prismaField({
    type: [ArtworkRanks],
    args: { artwork_id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args) =>
      prisma.artworkRanks.findMany({
        ...query,
        where: { artwork_id: parseInt(args.artwork_id), rank_id: { in: [3, 4] } }
      })
  })
);

// 報告理由一覧 (RankTypeId=3)
builder.queryField("getReportReasons", (t) =>
  t.prismaField({
    type: [Ranks],
    resolve: (query) =>
      prisma.ranks.findMany({
        ...query,
        where: { rank_type_id: 3 },
        orderBy: { id: 'asc' }
      })
  })
);
