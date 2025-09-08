import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications as NotificationIcon,
  ChatBubbleOutline as ChatIcon,
  People as PeopleIcon,
  Palette as ArtworkIcon,
  Article as ArticleIcon,
  Comment as CommentIcon,
  Report as ReportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const drawerWidth = 240;

const menuItems = [
  { text: 'ダッシュボード', icon: <DashboardIcon />, href: '/admin/dashboard' },
  { text: '通知管理', icon: <NotificationIcon />, href: '/admin/notifications' },
  { text: 'チャット管理', icon: <ChatIcon />, href: '/admin/chats' },
  { text: 'ユーザー管理', icon: <PeopleIcon />, href: '/admin/users' },
  { text: '作品管理', icon: <ArtworkIcon />, href: '/admin/artworks' },
  { text: '記事管理', icon: <ArticleIcon />, href: '/admin/articles' },
  { text: 'コメント管理', icon: <CommentIcon />, href: '/admin/comments' },
  { text: '報告管理', icon: <ReportIcon />, href: '/admin/reports' },
];

export default function AdminSidebar() {
  const router = useRouter();
  const { handleAdminLogout } = useAdminAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={router.pathname === item.href}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={async () => {
              try {
                await handleAdminLogout();
              } catch (e) {
                // no-op; toast handled in context
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}