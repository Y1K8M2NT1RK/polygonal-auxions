import { faker } from '@faker-js/faker';
import { prisma } from '../../src/server/db';

export const createNotificationsData = (): any[] => {
  const notificationsData: any[] = [];
  
  // フォロー通知のサンプル
  notificationsData.push({
    recipient_id: 1,
    actor_id: 2,
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'suzuki_hanakoさんがあなたをフォローしました',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
  });

  notificationsData.push({
    recipient_id: 1,
    actor_id: 3,
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'sato_kenjiさんがあなたをフォローしました',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
  });

  // 新規作品通知のサンプル
  notificationsData.push({
    recipient_id: 1,
    actor_id: 2,
    type: 'NEW_ARTWORK',
    title: '新しい作品が投稿されました',
    message: 'suzuki_hanakoさんが新しい作品「抽象的な風景」を投稿しました',
    artwork_id: 1,
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30), // 30分前
  });

  notificationsData.push({
    recipient_id: 2,
    actor_id: 3,
    type: 'NEW_ARTWORK',
    title: '新しい作品が投稿されました',
    message: 'sato_kenjiさんが新しい作品「デジタルアート作品」を投稿しました',
    artwork_id: 2,
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6時間前
  });

  // コメント通知のサンプル
  notificationsData.push({
    recipient_id: 1,
    actor_id: 2,
    type: 'NEW_COMMENT',
    title: 'コメントが投稿されました',
    message: 'suzuki_hanakoさんがあなたの作品「抽象的な風景」にコメントしました',
    artwork_id: 1,
    comment_id: 1,
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 15), // 15分前
  });

  notificationsData.push({
    recipient_id: 2,
    actor_id: 1,
    type: 'NEW_COMMENT',
    title: 'コメントが投稿されました',
    message: 'tanaka_taroさんがあなたの作品「デジタルアート作品」にコメントしました',
    artwork_id: 2,
    comment_id: 2,
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12時間前
  });

  notificationsData.push({
    recipient_id: 1,
    actor_id: 3,
    type: 'NEW_COMMENT',
    title: 'コメントが投稿されました',
    message: 'sato_kenjiさんがあなたの作品「抽象的な風景」にコメントしました',
    artwork_id: 1,
    comment_id: 3,
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45), // 45分前
  });

  return notificationsData;
};

export const seedNotifications = async () => {
  console.log('🔔 Seeding notifications...');
  
  try {
    const notificationsData = createNotificationsData();
    
    // バッチ作成
    const result = await prisma.notification.createMany({
      data: notificationsData,
      skipDuplicates: true,
    });
    
    console.log(`✅ Created ${result.count} notifications`);
  } catch (error) {
    console.error('❌ Error seeding notifications:', error);
    throw error;
  }
};