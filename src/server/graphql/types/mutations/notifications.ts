import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// 通知を既読にする
builder.mutationField("markNotificationAsRead", (t) =>
  t.prismaField({
    type: Notification,
    authScopes: { isAuthenticated: true },
    args: {
      slug_id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) throw new Error('認証が必要です');

      const notification = await prisma.notification.findFirst({
        where: {
          slug_id: args.slug_id,
          recipient_id: userId,
        },
      });

      if (!notification) {
        throw new Error('通知が見つかりません');
      }

      return prisma.notification.update({
        ...query,
        where: { id: notification.id },
        data: { is_read: true },
        include: {
          recipient: true,
          actor: true,
          artwork: {
            include: {
              user: true,
              artwork_file: true,
            },
          },
          comment: {
            include: {
              user: true,
              artwork: true,
            },
          },
        },
      });
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

      try {
        await prisma.notification.updateMany({
          where: {
            recipient_id: userId,
            is_read: false,
          },
          data: { is_read: true },
        });

        return true;
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return false;
      }
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
  return prisma.notification.create({
    data: {
      recipient_id: recipientId,
      actor_id: actorId,
      type,
      title,
      message,
      artwork_id: artworkId,
      comment_id: commentId,
    },
  });
}

// 通知作成用のヘルパー関数をエクスポート
export { createNotification };