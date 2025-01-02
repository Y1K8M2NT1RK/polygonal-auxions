import { builder } from '../../builder';
import { prisma } from '../../db';

// メインのテーブル
export const Artwork = builder.prismaObject('Artwork', {
  fields: (t) => ({
    id: t.exposeID('id'),
    slug_id: t.exposeID('slug_id'),
    title: t.exposeString('title'),
    feature: t.exposeString('feature'),
    likes: t.exposeInt('likes'),
    bads: t.exposeInt('bads'),
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
    resolve: (query, _parent, _args, ctx, _info) =>
      prisma.artworkRanks.findMany({ ...query, where: { user_id: ctx.auth?.id, rank_id: {in: [3, 4]} }})
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
