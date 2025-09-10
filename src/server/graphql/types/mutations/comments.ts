import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { Comment } from '../consts';
import { createNotification } from './notifications';

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
    resolve: async (_query, _parent, args, ctx) => {
      const result = await prisma.comment.upsert({
        where: { slug_id: args.comment_slug_id ?? '' },
        update: { body: args.body, updated_at: new Date().toISOString() },
        create: {
          body: args.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          artwork_id: parseInt(args.artwork_id),
          user_id: ctx.auth?.id as number,
        },
        include: {
          artwork: {
            include: {
              user: true
            }
          },
          user: true
        }
      });

      // 新しいコメントの場合（既存コメントの編集ではない場合）のみ通知を作成
      if (!args.comment_slug_id && result.artwork.user.id !== ctx.auth?.id) {
        try {
          await createNotification(
            result.artwork.user.id, // 作品の所有者に通知
            ctx.auth?.id as number, // コメントした人
            'NEW_COMMENT',
            'コメントが投稿されました',
            `${result.user.name}さんがあなたの作品「${result.artwork.title}」にコメントしました`,
            result.artwork.id,
            result.id
          );
        } catch (error) {
          console.error('Failed to create notification for new comment:', error);
          // 通知作成に失敗してもコメント投稿は成功とする
        }
      }

      return result;
    },
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
