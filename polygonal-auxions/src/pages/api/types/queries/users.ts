import { builder } from '../../builder';
import { prisma } from '../../db';

// メインのテーブル
builder.prismaObject('User', {
  fields: (t) => ({
    name: t.exposeString('name'),
    name_kana: t.exposeString('name_kana', {nullable: true}),
    handle_name: t.exposeString('handle_name'),
    email: t.exposeString('email'),
    introduction: t.exposeString('introduction'),
    address: t.exposeString('address'),
    created_at: t.expose('created_at', {type: 'Date'}),
    artworks: t.relation('artworks'),
    comments: t.relation('comments'),
  }),
});

// ユーザープロフィール
builder.queryField("user", (t) =>
  t.prismaField({
    type: "User", // 一つのデータを求める場合は[]で囲わない
    args: {
      handle_name: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findUniqueOrThrow({
        ...query,
        where: { handle_name: _args.handle_name },
        include: {
          artworks: { orderBy: { created_at : 'desc' }},
          comments: { orderBy: { created_at : 'desc' }}
        }
      }),
  })
);
