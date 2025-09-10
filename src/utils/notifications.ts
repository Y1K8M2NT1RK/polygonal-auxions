// Mock data for demonstration - using static timestamps to avoid hydration issues
const getBaseNotifications = () => [
  {
    id: 1,
    slug_id: 'clxyz123',
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'suzuki_hanakoさんがあなたをフォローしました',
    is_read: false,
    created_at: '2024-01-15T14:30:00.000Z',
    actor: {
      id: 2,
      name: 'suzuki hanako',
      handle_name: 'suzuki_hanako'
    }
  },
  {
    id: 2,
    slug_id: 'clxyz124',
    type: 'NEW_ARTWORK',
    title: '新しい作品が投稿されました',
    message: 'tanaka_taroさんが新しい作品「抽象的な風景」を投稿しました',
    is_read: false,
    created_at: '2024-01-15T12:00:00.000Z',
    actor: {
      id: 1,
      name: 'tanaka taro',
      handle_name: 'tanaka_taro'
    },
    artwork: {
      id: 1,
      slug_id: 'artwork123',
      title: '抽象的な風景'
    }
  },
  {
    id: 3,
    slug_id: 'clxyz125',
    type: 'NEW_COMMENT',
    title: 'コメントが投稿されました',
    message: 'sato_kenjiさんがあなたの作品「デジタルアート」にコメントしました',
    is_read: true,
    created_at: '2024-01-14T15:00:00.000Z',
    actor: {
      id: 3,
      name: 'sato kenji',
      handle_name: 'sato_kenji'
    },
    artwork: {
      id: 2,
      slug_id: 'artwork124',
      title: 'デジタルアート'
    },
    comment: {
      id: 1,
      slug_id: 'comment123',
      body: 'とても素晴らしい作品ですね！'
    }
  },
  {
    id: 4,
    slug_id: 'clxyz126',
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'yamada_akikoさんがあなたをフォローしました',
    is_read: false,
    created_at: '2024-01-13T10:15:00.000Z',
    actor: {
      id: 4,
      name: 'yamada akiko',
      handle_name: 'yamada_akiko'
    }
  },
  {
    id: 5,
    slug_id: 'clxyz127',
    type: 'NEW_ARTWORK',
    title: '新しい作品が投稿されました',
    message: 'watanabe_takeshiさんが新しい作品「未来の都市」を投稿しました',
    is_read: false,
    created_at: '2024-01-13T08:30:00.000Z',
    actor: {
      id: 5,
      name: 'watanabe takeshi',
      handle_name: 'watanabe_takeshi'
    },
    artwork: {
      id: 3,
      slug_id: 'artwork125',
      title: '未来の都市'
    }
  },
  {
    id: 6,
    slug_id: 'clxyz128',
    type: 'NEW_COMMENT',
    title: 'コメントが投稿されました',
    message: 'kobayashi_meiさんがあなたの作品「自然の美」にコメントしました',
    is_read: true,
    created_at: '2024-01-12T16:45:00.000Z',
    actor: {
      id: 6,
      name: 'kobayashi mei',
      handle_name: 'kobayashi_mei'
    },
    artwork: {
      id: 4,
      slug_id: 'artwork126',
      title: '自然の美'
    },
    comment: {
      id: 2,
      slug_id: 'comment124',
      body: '色使いが素晴らしいですね。'
    }
  },
  {
    id: 7,
    slug_id: 'clxyz129',
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'nakamura_hiroshiさんがあなたをフォローしました',
    is_read: false,
    created_at: '2024-01-12T14:20:00.000Z',
    actor: {
      id: 7,
      name: 'nakamura hiroshi',
      handle_name: 'nakamura_hiroshi'
    }
  }
];

// User-specific notification management
const normalizeUserId = (userId: number | string): number => {
  if (typeof userId === 'number') return userId;
  const parsed = parseInt(userId, 10);
  return isNaN(parsed) ? 0 : parsed;
};
const getStorageKey = (userId: number | string) => `notifications_read_${normalizeUserId(userId)}`;

export const getUserNotifications = (userId: number | string) => {
  const baseNotifications = getBaseNotifications();
  if (typeof window === 'undefined') return baseNotifications;
  
  try {
    const readNotifications = JSON.parse(localStorage.getItem(getStorageKey(userId)) || '[]');
    return baseNotifications.map(notification => ({
      ...notification,
      is_read: readNotifications.includes(notification.slug_id) || notification.is_read
    }));
  } catch {
    return baseNotifications;
  }
};

export const getUnreadNotificationsCount = (userId: number | string) => {
  const notifications = getUserNotifications(userId);
  return notifications.filter(n => !n.is_read).length;
};

export const markNotificationAsRead = (userId: number | string, notificationSlugId: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const storageKey = getStorageKey(userId);
    const readNotifications = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!readNotifications.includes(notificationSlugId)) {
      readNotifications.push(notificationSlugId);
      localStorage.setItem(storageKey, JSON.stringify(readNotifications));
    }
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
};

export const markAllNotificationsAsRead = (userId: number | string, notifications: any[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    const storageKey = getStorageKey(userId);
    const allSlugIds = notifications.map(n => n.slug_id);
    localStorage.setItem(storageKey, JSON.stringify(allSlugIds));
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
  }
};