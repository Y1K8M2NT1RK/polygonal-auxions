/*
import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// Temporarily disabled due to Prisma generation issues
// Will be enabled after proper migration

// 通知を既読にする (モック実装)
builder.mutationField("markNotificationAsRead", (t) =>
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
        is_read: true,
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

// 全ての通知を既読にする
builder.mutationField("markAllNotificationsAsRead", (t) =>
  t.field({
    type: 'Boolean',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return false;

      // Return mock success for now
      return true;
    },
  })
);

// 通知作成（内部使用）
async function createNotification(
  recipientId: number,
  actorId: number | null,
  type: 'FOLLOW' | 'NEW_ARTWORK' | 'NEW_COMMENT',
  title: string,
  message: string,
  artworkId?: number,
  commentId?: number
) {
  // Mock implementation for now
  console.log('Creating notification:', { recipientId, actorId, type, title, message, artworkId, commentId });
  return {
    id: Date.now(),
    slug_id: `mock_${Date.now()}`,
    recipient_id: recipientId,
    actor_id: actorId,
    type,
    title,
    message,
    artwork_id: artworkId || null,
    comment_id: commentId || null,
    is_read: false,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

// 通知作成用のヘルパー関数をエクスポート
export { createNotification };
*/

// Temporarily disabled - will be enabled after Prisma setup
export const createNotification = () => {};