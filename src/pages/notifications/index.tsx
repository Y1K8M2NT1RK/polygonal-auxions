import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Container, 
  Paper, 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  NotificationsNone, 
  Person, 
  Image, 
  Comment,
  CheckCircle
} from '@mui/icons-material';
import useResponsive from '@/hooks/useResponsive';

// Mock data for demonstration
const mockNotifications = [
  {
    id: 1,
    slug_id: 'clxyz123',
    type: 'FOLLOW',
    title: 'フォローされました',
    message: 'suzuki_hanakoさんがあなたをフォローしました',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
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
  }
];

// 通知アイコンを取得する関数
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'FOLLOW':
      return <Person />;
    case 'NEW_ARTWORK':
      return <Image />;
    case 'NEW_COMMENT':
      return <Comment />;
    default:
      return <NotificationsNone />;
  }
};

// 通知タイプの日本語表示
const getNotificationTypeLabel = (type: string) => {
  switch (type) {
    case 'FOLLOW':
      return 'フォロー';
    case 'NEW_ARTWORK':
      return '新作品';
    case 'NEW_COMMENT':
      return 'コメント';
    default:
      return '通知';
  }
};

// 時間表示フォーマット
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const notificationDate = new Date(dateString);
  const diffInMs = now.getTime() - notificationDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  } else if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  } else {
    return `${diffInDays}日前`;
  }
};

interface NotificationListProps {
  notifications: any[];
  selectedNotificationId?: string;
  onNotificationSelect: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications,
  selectedNotificationId, 
  onNotificationSelect,
  onMarkAllAsRead,
  showUnreadOnly,
  onToggleUnreadOnly
}) => {
  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.is_read)
    : notifications;

  return (
    <Paper sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          通知一覧
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            size="small"
            variant={showUnreadOnly ? 'contained' : 'outlined'}
            onClick={onToggleUnreadOnly}
          >
            {showUnreadOnly ? '全て表示' : '未読のみ'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={onMarkAllAsRead}
            startIcon={<CheckCircle />}
          >
            全て既読
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List disablePadding>
          {filteredNotifications.map((notification: any, index: number) => (
            <React.Fragment key={notification.slug_id}>
              <ListItem
                component="div"
                sx={{
                  cursor: 'pointer',
                  backgroundColor: notification.is_read ? 'transparent' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                  ...(selectedNotificationId === notification.slug_id && {
                    backgroundColor: 'action.selected',
                  }),
                }}
                onClick={() => onNotificationSelect(notification.slug_id)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: notification.is_read ? 'grey.400' : 'primary.main' }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" noWrap>
                        {notification.title}
                      </Typography>
                      <Chip
                        label={getNotificationTypeLabel(notification.type)}
                        size="small"
                        variant="outlined"
                      />
                      {!notification.is_read && (
                        <Chip
                          label="未読"
                          size="small"
                          color="primary"
                          variant="filled"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {formatTimeAgo(notification.created_at)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < filteredNotifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {filteredNotifications.length === 0 && (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <NotificationsNone sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
              <Typography color="text.secondary">
                {showUnreadOnly ? '未読の通知はありません' : '通知はありません'}
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Paper>
  );
};

interface NotificationDetailProps {
  notification?: any;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ notification }) => {
  if (!notification) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <NotificationsNone sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            通知を選択してください
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height: '100%', overflow: 'auto' }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {getNotificationIcon(notification.type)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{notification.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatTimeAgo(notification.created_at)}
            </Typography>
          </Box>
          <Chip
            label={getNotificationTypeLabel(notification.type)}
            variant="outlined"
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" paragraph>
            {notification.message}
          </Typography>
        </Box>

        {notification.actor && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              関連ユーザー
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {notification.actor.name[0]}
              </Avatar>
              <Typography variant="body2">
                {notification.actor.name} (@{notification.actor.handle_name})
              </Typography>
            </Box>
          </Box>
        )}

        {notification.artwork && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              関連作品
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                {notification.artwork.title}
              </Typography>
            </Paper>
          </Box>
        )}

        {notification.comment && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              関連コメント
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2">
                {notification.comment.body}
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default function NotificationsPage() {
  const router = useRouter();
  const { isSmallScreen } = useResponsive();
  const { id } = router.query;
  
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | undefined>(
    typeof id === 'string' ? id : undefined
  );
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const selectedNotification = notifications.find(n => n.slug_id === selectedNotificationId);

  // モバイルでの通知選択処理
  const handleNotificationSelect = (notificationId: string) => {
    if (isSmallScreen) {
      router.push(`/notifications/${notificationId}`);
    } else {
      setSelectedNotificationId(notificationId);
      router.push(`/notifications/${notificationId}`, undefined, { shallow: true });
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleToggleUnreadOnly = () => {
    setShowUnreadOnly(prev => !prev);
  };

  useEffect(() => {
    if (typeof id === 'string') {
      setSelectedNotificationId(id);
    }
  }, [id]);

  if (isSmallScreen) {
    // スマートフォン: 通知一覧のみ表示（詳細は別ページ）
    if (id) {
      return (
        <Container maxWidth="md" sx={{ py: 2 }}>
          <NotificationDetail notification={selectedNotification} />
        </Container>
      );
    }
    
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <NotificationList 
          notifications={notifications}
          onNotificationSelect={handleNotificationSelect}
          onMarkAllAsRead={handleMarkAllAsRead}
          showUnreadOnly={showUnreadOnly}
          onToggleUnreadOnly={handleToggleUnreadOnly}
        />
      </Container>
    );
  }

  // PC/タブレット: 分割画面
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
        <Box sx={{ width: '33%', minWidth: 300 }}>
          <NotificationList
            notifications={notifications}
            selectedNotificationId={selectedNotificationId}
            onNotificationSelect={handleNotificationSelect}
            onMarkAllAsRead={handleMarkAllAsRead}
            showUnreadOnly={showUnreadOnly}
            onToggleUnreadOnly={handleToggleUnreadOnly}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <NotificationDetail notification={selectedNotification} />
        </Box>
      </Box>
    </Container>
  );
}