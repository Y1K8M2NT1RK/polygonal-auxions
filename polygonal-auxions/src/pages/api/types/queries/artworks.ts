import { builder } from '../../builder';
import { prisma } from '../../db';

// メインのテーブル
export const Artwork = builder.prismaObject('Artwork', {
  fields: (t) => ({
    slug_id: t.exposeID('slug_id'),
    title: t.exposeString('title'),
    feature: t.exposeString('feature'),
    likes: t.exposeInt('likes'),
    bads: t.exposeInt('bads'),
    created_at: t.expose('created_at', {type: 'Date'}),
    user: t.relation('user'),
    user_id: t.exposeID('user_id'),
    comments: t.relation('comments'),
  }),
});

// 作品一覧
builder.queryField("artworks", (t) =>
  t.prismaField({
    type: [Artwork], // 複数のデータを求める場合は[]で囲う
    resolve: (query, _parent, _args, _ctx, _info) => prisma.artwork.findMany({ ...query, orderBy: { created_at: 'desc' }}),
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
