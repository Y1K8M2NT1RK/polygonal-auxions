import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  NotificationsNone, 
  Person, 
  Image, 
  Comment,
  MarkAsUnread,
  CheckCircle
} from '@mui/icons-material';
import useResponsive from '@/hooks/useResponsive';
import { useQuery, useMutation } from 'urql';

// GraphQL queries
const NOTIFICATIONS_QUERY = `
  query GetNotifications($limit: Int, $offset: Int, $onlyUnread: Boolean) {
    notifications(limit: $limit, offset: $offset, onlyUnread: $onlyUnread) {
      id
      slug_id
      type
      title
      message
      is_read
      created_at
      actor {
        id
        name
        handle_name
      }
      artwork {
        id
        slug_id
        title
      }
      comment {
        id
        slug_id
        body
      }
    }
  }
`;

const NOTIFICATION_DETAIL_QUERY = `
  query GetNotification($slug_id: String!) {
    notification(slug_id: $slug_id) {
      id
      slug_id
      type
      title
      message
      is_read
      created_at
      actor {
        id
        name
        handle_name
      }
      artwork {
        id
        slug_id
        title
        user {
          name
          handle_name
        }
      }
      comment {
        id
        slug_id
        body
        artwork {
          title
        }
      }
    }
  }
`;

const MARK_AS_READ_MUTATION = `
  mutation MarkNotificationAsRead($slug_id: String!) {
    markNotificationAsRead(slug_id: $slug_id) {
      id
      is_read
    }
  }
`;

const MARK_ALL_AS_READ_MUTATION = `
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`;

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
  selectedNotificationId?: string;
  onNotificationSelect: (notificationId: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  selectedNotificationId, 
  onNotificationSelect 
}) => {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const [notificationsResult] = useQuery({
    query: NOTIFICATIONS_QUERY,
    variables: { limit: 50, offset: 0, onlyUnread: showUnreadOnly },
  });

  const [, markAllAsRead] = useMutation(MARK_ALL_AS_READ_MUTATION);

  const { data, fetching, error } = notificationsResult;

  const handleMarkAllAsRead = async () => {
    await markAllAsRead({});
  };

  if (fetching) return <CircularProgress />;
  if (error) return <Typography color="error">エラーが発生しました</Typography>;

  const notifications = data?.notifications || [];

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
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            {showUnreadOnly ? '全て表示' : '未読のみ'}
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={handleMarkAllAsRead}
            startIcon={<CheckCircle />}
          >
            全て既読
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List disablePadding>
          {notifications.map((notification: any, index: number) => (
            <React.Fragment key={notification.slug_id}>
              <ListItem
                button
                selected={selectedNotificationId === notification.slug_id}
                onClick={() => onNotificationSelect(notification.slug_id)}
                sx={{
                  backgroundColor: notification.is_read ? 'transparent' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
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
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          {notifications.length === 0 && (
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
  notificationId?: string;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ notificationId }) => {
  const [notificationResult] = useQuery({
    query: NOTIFICATION_DETAIL_QUERY,
    variables: { slug_id: notificationId },
    pause: !notificationId,
  });

  const [, markAsRead] = useMutation(MARK_AS_READ_MUTATION);

  const { data, fetching, error } = notificationResult;

  useEffect(() => {
    if (notificationId && data?.notification && !data.notification.is_read) {
      markAsRead({ slug_id: notificationId });
    }
  }, [notificationId, data, markAsRead]);

  if (!notificationId) {
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

  if (fetching) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error || !data?.notification) {
    return (
      <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">通知が見つかりません</Typography>
      </Paper>
    );
  }

  const notification = data.notification;

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
              {notification.artwork.user && (
                <Typography variant="caption" color="text.secondary">
                  作者: {notification.artwork.user.name}
                </Typography>
              )}
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
              {notification.comment.artwork && (
                <Typography variant="caption" color="text.secondary">
                  作品: {notification.comment.artwork.title}
                </Typography>
              )}
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

  // モバイルでの通知選択処理
  const handleNotificationSelect = (notificationId: string) => {
    if (isSmallScreen) {
      router.push(`/notifications/${notificationId}`);
    } else {
      setSelectedNotificationId(notificationId);
      router.push(`/notifications/${notificationId}`, undefined, { shallow: true });
    }
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
          <NotificationDetail notificationId={typeof id === 'string' ? id : undefined} />
        </Container>
      );
    }
    
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <NotificationList onNotificationSelect={handleNotificationSelect} />
      </Container>
    );
  }

  // PC/タブレット: 分割画面
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 200px)' }}>
        <Grid item xs={12} md={4}>
          <NotificationList
            selectedNotificationId={selectedNotificationId}
            onNotificationSelect={handleNotificationSelect}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <NotificationDetail notificationId={selectedNotificationId} />
        </Grid>
      </Grid>
    </Container>
  );
}