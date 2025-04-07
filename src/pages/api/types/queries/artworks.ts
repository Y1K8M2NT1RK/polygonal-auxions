import { builder } from '../../builder';
import { prisma } from '../../db';
import { Artwork, ArtworkRanks } from '../consts';

// 作品一覧
builder.queryField("artworks", (t) =>
  t.prismaField({
    type: [Artwork], // 複数のデータを求める場合は[]で囲う
    resolve: (query, _parent, _args, _ctx, _info) => prisma.artwork.findMany({ ...query, orderBy: { created_at: 'desc' }}),
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
        include: { comments: { orderBy: { created_at : 'desc' }},}
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
