import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { Comment } from '../consts';

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
  t.boolean({
    authScopes: { isAuthenticated: true },
    args: { comment_slug_id: t.arg.string({ required: true }), rank_id: t.arg.string({ required: true }) },
    resolve: async (_parent, args, ctx) => {
      const targetComment = await prisma.comment.findFirst({ where: { slug_id: args.comment_slug_id } });
      if (!targetComment) throw new Error('コメントが見つかりません。');
      
      // Check if user has already reported this comment with this reason
      const existingReport = await prisma.commentRanks.findFirst({
        where: {
          comment_id: targetComment.id,
          rank_id: parseInt(args.rank_id),
          user_id: ctx.auth?.id as number,
        },
      });
      
      if (existingReport) {
        throw new Error('既にこの理由でコメントを報告しています。');
      }
      
      await prisma.commentRanks.create({
        data: { 
          comment_id: targetComment.id, 
          rank_id: parseInt(args.rank_id), 
          user_id: ctx.auth?.id as number 
        },
      });
      
      return true;
    },
  })
);
