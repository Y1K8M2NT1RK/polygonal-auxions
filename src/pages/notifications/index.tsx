import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  Box, 
  Container, 
  Paper, 
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  NotificationsNone, 
  Person, 
  Image as ImageIcon, 
  Comment,
  CheckCircle,
  ArrowBack
} from '@mui/icons-material';
import useResponsive from '@/hooks/useResponsive';
import { useAuth } from '@/contexts/AuthContexts';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from '@/utils/notifications';

// 通知アイコンを取得する関数
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'FOLLOW':
      return <Person />;
    case 'NEW_ARTWORK':
      return <ImageIcon />;
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
  onMarkAsRead: (notificationId: string) => void;
  showUnreadOnly: boolean;
  onToggleUnreadOnly: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications,
  selectedNotificationId, 
  onNotificationSelect,
  onMarkAllAsRead,
  onMarkAsRead,
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
                onClick={() => {
                  onNotificationSelect(notification.slug_id);
                  if (!notification.is_read) {
                    onMarkAsRead(notification.slug_id);
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: notification.is_read ? 'grey.400' : 'primary.main' }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography 
                      variant="subtitle2" 
                      noWrap 
                      sx={{ fontWeight: notification.is_read ? 'normal' : 'bold' }}
                    >
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
                  <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 0.5 }}>
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {formatTimeAgo(notification.created_at)}
                  </Typography>
                </Box>
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
  showBackButton?: boolean;
  onBack?: () => void;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ 
  notification, 
  showBackButton = false, 
  onBack 
}) => {
  if (!notification) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <NotificationsNone sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {showBackButton ? '通知が見つかりません' : '通知を選択してください'}
          </Typography>
          {showBackButton && (
            <Button 
              startIcon={<ArrowBack />} 
              onClick={onBack}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              通知一覧に戻る
            </Button>
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height: '100%', overflow: 'auto' }}>
      {showBackButton && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={onBack}
            size="small"
          >
            通知一覧に戻る
          </Button>
        </Box>
      )}
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
  const { user, fetching } = useAuth();
  const { id } = router.query;
  
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | undefined>(
    typeof id === 'string' ? id : undefined
  );
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Function to trigger notification refresh in other components
  const triggerNotificationRefresh = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('notificationsChanged'));
    }
  };

  // Load user-specific notifications when user is available
  useEffect(() => {
    if (user) {
      const userNotifications = getUserNotifications(user.id);
      setNotifications(userNotifications);
    }
  }, [user]);

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

  const handleMarkAsRead = useCallback((notificationSlugId: string) => {
    if (!user) return;
    
    markNotificationAsRead(user.id, notificationSlugId);
    setNotifications(prev => prev.map(n => 
      n.slug_id === notificationSlugId ? { ...n, is_read: true } : n
    ));
    triggerNotificationRefresh();
  }, [user]);

  const handleMarkAllAsRead = () => {
    if (!user) return;
    
    markAllNotificationsAsRead(user.id, notifications);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    triggerNotificationRefresh();
  };

  const handleToggleUnreadOnly = () => {
    setShowUnreadOnly(prev => !prev);
  };

  const handleBackToList = () => {
    router.push('/notifications');
  };

  useEffect(() => {
    if (typeof id === 'string') {
      setSelectedNotificationId(id);
      // Mark as read when viewing the detail page
      if (user && selectedNotification && !selectedNotification.is_read) {
        handleMarkAsRead(id);
      }
    }
  }, [id, user, selectedNotification, handleMarkAsRead]);

  // Show loading state if authentication is still being checked
  if (fetching) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            読み込み中...
          </Typography>
        </Paper>
      </Container>
    );
  }

  // Redirect unauthenticated users to home page
  if (!user) {
    router.push('/');
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            ログインが必要です
          </Typography>
          <Typography variant="body1" color="text.secondary">
            通知を表示するにはログインしてください。
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (isSmallScreen) {
    // スマートフォン: 通知一覧のみ表示（詳細は別ページ）
    if (id) {
      return (
        <>
          <Head>
            <title>通知詳細 - Polygonal Auxions</title>
          </Head>
          <Container maxWidth="md" sx={{ py: 2 }}>
            <NotificationDetail 
              notification={selectedNotification} 
              showBackButton={true}
              onBack={handleBackToList}
            />
          </Container>
        </>
      );
    }
    
    return (
      <>
        <Head>
          <title>通知一覧 - Polygonal Auxions</title>
        </Head>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <NotificationList 
            notifications={notifications}
            onNotificationSelect={handleNotificationSelect}
            onMarkAllAsRead={handleMarkAllAsRead}
            onMarkAsRead={handleMarkAsRead}
            showUnreadOnly={showUnreadOnly}
            onToggleUnreadOnly={handleToggleUnreadOnly}
          />
        </Container>
      </>
    );
  }

  // PC/タブレット: 分割画面
  return (
    <>
      <Head>
        <title>通知 - Polygonal Auxions</title>
      </Head>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
          <Box sx={{ width: '33%', minWidth: 300 }}>
            <NotificationList
              notifications={notifications}
              selectedNotificationId={selectedNotificationId}
              onNotificationSelect={handleNotificationSelect}
              onMarkAllAsRead={handleMarkAllAsRead}
              onMarkAsRead={handleMarkAsRead}
              showUnreadOnly={showUnreadOnly}
              onToggleUnreadOnly={handleToggleUnreadOnly}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <NotificationDetail notification={selectedNotification} />
          </Box>
        </Box>
      </Container>
    </>
  );
}