import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// 通知を既読にする
builder.mutationField('markNotificationAsRead', (t) =>
  t.field({
    type: Notification,
    authScopes: { isAuthenticated: true },
    args: { slug_id: t.arg.string({ required: true }) },
    resolve: async (_parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) throw new Error('認証が必要です');
      const notif = await prisma.notification.update({
        where: { slug_id: args.slug_id },
        data: { is_read: true },
      });
      return notif;
    },
  })
);

// 全ての通知を既読にする
builder.mutationField('markAllNotificationsAsRead', (t) =>
  t.field({
    type: 'Boolean',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return false;
      await prisma.notification.updateMany({
        where: { recipient_id: userId, is_read: false },
        data: { is_read: true },
      });
      return true;
    },
  })
);

// 通知作成（内部使用）
export async function createNotification(
  recipientId: number,
  actorId: number | null,
  type: 'FOLLOW' | 'NEW_ARTWORK' | 'NEW_COMMENT',
  title: string,
  message: string,
  artworkId?: number,
  commentId?: number
) {
  return prisma.notification.create({
    data: {
      recipient_id: recipientId,
      actor_id: actorId ?? null,
      type,
      title,
      message,
      artwork_id: artworkId ?? null,
      comment_id: commentId ?? null,
    },
  });
}