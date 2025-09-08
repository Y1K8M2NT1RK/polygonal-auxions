import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Notification } from '../consts';

// 通知一覧取得
builder.queryField("notifications", (t) =>
  t.prismaField({
    type: [Notification],
    authScopes: { isAuthenticated: true },
    args: {
      limit: t.arg.int({ defaultValue: 20 }),
      offset: t.arg.int({ defaultValue: 0 }),
      onlyUnread: t.arg.boolean({ defaultValue: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const userId = ctx.auth?.id as number;
      if (!userId) return [];

      const whereCondition: any = {
        recipient_id: userId,
      };

      if (args.onlyUnread) {
        whereCondition.is_read = false;
      }

      return prisma.notification.findMany({
        ...query,
        where: whereCondition,
        orderBy: { created_at: 'desc' },
        take: args.limit,
        skip: args.offset,
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

// 通知詳細取得
builder.queryField("notification", (t) =>
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
        ...query,
        where: {
          slug_id: args.slug_id,
          recipient_id: userId,
        },
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

      if (!notification) {
        throw new Error('通知が見つかりません');
      }

      return notification;
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

      return prisma.notification.count({
        where: {
          recipient_id: userId,
          is_read: false,
        },
      });
    },
  })
);