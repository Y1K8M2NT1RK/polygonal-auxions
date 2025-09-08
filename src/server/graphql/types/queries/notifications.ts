/*
import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// Temporarily disabled due to Prisma generation issues
// Will be enabled after proper migration

// 通知一覧取得 (モックデータ返却)
builder.queryField("notifications", (t) =>
  t.field({
    type: [Notification],
    authScopes: { isAuthenticated: true },
    args: {
      limit: t.arg.int({ defaultValue: 20 }),
      offset: t.arg.int({ defaultValue: 0 }),
      onlyUnread: t.arg.boolean({ defaultValue: false }),
    },
    resolve: async (_parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return [];

      // Return mock data for now
      return [
        {
          id: 1,
          slug_id: 'clxyz123',
          recipient_id: userId,
          actor_id: 2,
          type: 'FOLLOW' as const,
          title: 'フォローされました',
          message: 'ユーザーがあなたをフォローしました',
          artwork_id: null,
          comment_id: null,
          is_read: false,
          created_at: new Date(Date.now() - 1000 * 60 * 30),
          updated_at: new Date(),
          recipient: undefined,
          actor: undefined,
          artwork: undefined,
          comment: undefined,
        },
      ];
    },
  })
);

// 通知詳細取得 (モックデータ返却)
builder.queryField("notification", (t) =>
  t.field({
    type: Notification,
    authScopes: { isAuthenticated: true },
    args: {
      slug_id: t.arg.string({ required: true }),
    },
    resolve: async (_parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) throw new Error('認証が必要です');

      // Return mock data for now
      return {
        id: 1,
        slug_id: args.slug_id,
        recipient_id: userId,
        actor_id: 2,
        type: 'FOLLOW' as const,
        title: 'フォローされました',
        message: 'ユーザーがあなたをフォローしました',
        artwork_id: null,
        comment_id: null,
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 30),
        updated_at: new Date(),
        recipient: undefined,
        actor: undefined,
        artwork: undefined,
        comment: undefined,
      };
    },
  })
);

// 未読通知数取得
builder.queryField("unreadNotificationsCount", (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;

      // Return mock data for now
      return 3;
    },
  })
);
*/

// Temporarily disabled - will be enabled after Prisma setup
export const temp = true;