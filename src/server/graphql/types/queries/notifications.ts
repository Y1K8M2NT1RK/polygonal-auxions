import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// Pagination response type
const NotificationsListResponse = builder.simpleObject('NotificationsListResponse', {
  fields: (t: any) => ({
    notifications: t.field({ type: [Notification], required: true }),
    totalCount: t.int({ required: true }),
    hasNextPage: t.boolean({ required: true }),
    hasPreviousPage: t.boolean({ required: true }),
  }),
});

const MAX_LIMIT = 50;

// 通知一覧取得
builder.queryField('notifications', (t) =>
  t.field({
    description: 'Backward compatible simple list (deprecated: use notificationsList)',
    deprecationReason: 'Use notificationsList for pagination metadata',
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
      const limit = Math.min(args.limit ?? 20, MAX_LIMIT);
      const offset = Math.max(args.offset ?? 0, 0);
      return prisma.notification.findMany({
        where: {
          recipient_id: userId,
          ...(args.onlyUnread ? { is_read: false } : {}),
        },
        include: { actor: true, artwork: true, comment: true },
        orderBy: { created_at: 'desc' },
        skip: offset,
        take: limit,
      });
    },
  })
);

// Enhanced paginated list
builder.queryField('notificationsList', (t) =>
  t.field({
    type: NotificationsListResponse,
    authScopes: { isAuthenticated: true },
    args: {
      limit: t.arg.int({ defaultValue: 20 }),
      offset: t.arg.int({ defaultValue: 0 }),
      onlyUnread: t.arg.boolean({ defaultValue: false }),
    },
    resolve: async (_parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) {
        return { notifications: [], totalCount: 0, hasNextPage: false, hasPreviousPage: false };
      }
      const limit = Math.min(args.limit ?? 20, MAX_LIMIT);
      const offset = Math.max(args.offset ?? 0, 0);
      const where = {
        recipient_id: userId,
        ...(args.onlyUnread ? { is_read: false } : {}),
      };
      const [totalCount, notifications] = await Promise.all([
        prisma.notification.count({ where }),
        prisma.notification.findMany({
          where,
            include: { actor: true, artwork: true, comment: true },
          orderBy: { created_at: 'desc' },
          skip: offset,
          take: limit,
        }),
      ]);
      return {
        notifications,
        totalCount,
        hasNextPage: offset + limit < totalCount,
        hasPreviousPage: offset > 0,
      };
    },
  })
);

// 通知詳細取得
builder.queryField('notification', (t) =>
  t.field({
    type: Notification,
    authScopes: { isAuthenticated: true },
    args: { slug_id: t.arg.string({ required: true }) },
    resolve: async (_parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) throw new Error('AUTH_REQUIRED');
      const notif = await prisma.notification.findUnique({
        where: { slug_id: args.slug_id },
        include: { actor: true, artwork: true, comment: true },
      });
      if (!notif || notif.recipient_id !== userId) throw new Error('NOT_FOUND');
      return notif;
    },
  })
);

// 未読通知数取得
builder.queryField('unreadNotificationsCount', (t) =>
  t.field({
    type: 'Int',
    authScopes: { isAuthenticated: true },
    resolve: async (_parent, _args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return 0;
      return prisma.notification.count({ where: { recipient_id: userId, is_read: false } });
    },
  })
);

export {}; // ensure this file is treated as a module