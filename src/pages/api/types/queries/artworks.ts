import { builder } from '../../../../server/graphql/builder';
import { prisma } from '../../../../server/db';
import { Artwork, ArtworkRanks, userIncludeFile } from '../consts';

// 作品一覧
builder.queryField("artworks", (t) =>
  t.prismaField({
    type: [Artwork], // 複数のデータを求める場合は[]で囲う
    args: {
      q: t.arg.string({ required: false }),
      offset: t.arg.int({ required: false, defaultValue: 0 }),
      limit: t.arg.int({ required: false, defaultValue: 18 }),
    },
    resolve: (query, _parent, args, _ctx, _info) =>  {
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

// 作品の総数を取得（検索条件を考慮）
builder.queryField("artworksCount", (t) =>
  t.field({
    type: 'Int',
    args: {
      q: t.arg.string({ required: false }),
    },
    resolve: async (_parent, args, _ctx, _info) => {
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

// ログインユーザのお気に入り/ブックマークとして登録している作品を取得
builder.queryField("getAuthArtworkRanks", (t) =>
  t.prismaField({
    type: [ArtworkRanks], // 複数のデータを求める場合は[]で囲う
    authScopes: { isAuthenticated: true, },
    args: { artwork_id: t.arg.string({ required: false }),},
    resolve: (query, _parent, args, ctx, _info) =>
      prisma.artworkRanks.findMany({ ...query, where: { 
        ...(args.artwork_id ? { artwork_id: parseInt(args.artwork_id) } : {}),
        user_id: ctx.auth?.id,
        rank_id: {in: [3, 4]}
      }})
  })
);

// 作品詳細
builder.queryField("artwork", (t) =>
  t.prismaField({
    type: Artwork, // 一つのデータを求める場合は[]で囲わない
    args: {  slug_id: t.arg.string({ required: true }),},
    resolve: (query, _parent, args, _ctx, _info) =>
      prisma.artwork.findUniqueOrThrow({
        ...query,
        where: { slug_id: args.slug_id },
        include: {
          comments: { orderBy: { created_at : 'desc' }},
          artwork_file: true,
          user: userIncludeFile
        }
      }),
  })
);

// 一つの作品におけるお気に入り/ブックマークの数を取得
builder.queryField("getArtworkRanks", (t) =>
  t.prismaField({
    type: [ArtworkRanks], // 複数のデータを求める場合は[]で囲う
    args: { artwork_id: t.arg.string({ required: true }),},
    resolve: (query, _parent, args, _ctx, _info) =>
      prisma.artworkRanks.findMany({ ...query, where: { artwork_id: parseInt(args.artwork_id), rank_id: {in: [3, 4]} }})
  })
);
