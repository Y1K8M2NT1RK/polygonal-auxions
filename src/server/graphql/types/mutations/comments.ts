import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { Comment, CommentRanks } from '../consts';

builder.mutationField("upsertComment", (t) =>
  t.prismaField({
    type: Comment,
    errors: { types: [ZodError] },
    authScopes: { isAuthenticated: true },
    args: {
      comment_slug_id: t.arg.string({ required: false }),
      artwork_id: t.arg.string({ required: true }),
      body: t.arg.string({
        required: true,
        validate: {
          type: 'string',
          maxLength: [300, { message: '文字数が多すぎます。' }],
          minLength: [1, { message: '入力してください。' }],
        },
      }),
    },
    resolve: (_query, _parent, args, ctx) =>
      prisma.comment.upsert({
        where: { slug_id: args.comment_slug_id ?? '' },
        update: { body: args.body, updated_at: new Date().toISOString() },
        create: {
          body: args.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          artwork_id: parseInt(args.artwork_id),
          user_id: ctx.auth?.id as number,
        },
      }),
  })
);

builder.mutationField("removeComment", (t) =>
  t.prismaField({
    type: Comment,
    authScopes: { isAuthenticated: true },
    args: { comment_slug_id: t.arg.string({ required: true }) },
    resolve: async (_query, _parent, args) => {
      const targetComment = await prisma.comment.findFirst({ where: { slug_id: args.comment_slug_id } });
      if (!targetComment) throw new Error('コメントが見つかりません。');
      return prisma.comment.delete({ where: { slug_id: args.comment_slug_id } });
    },
  })
);

builder.mutationField("addCommentRank", (t) =>
  t.prismaField({
    type: CommentRanks,
    authScopes: { isAuthenticated: true },
    args: { comment_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
    resolve: (query, _parent, args, ctx) => prisma.commentRanks.create({
      ...query,
      data: { comment_id: parseInt(args.comment_id), rank_id: parseInt(args.rank_id), user_id: ctx.auth?.id as number },
    }),
  })
);
