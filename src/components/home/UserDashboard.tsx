import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Container,
} from '@mui/material';
import {
  Palette as ArtworkIcon,
  Comment as CommentIcon,
  Person as FollowIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContexts';
import { useQuery } from 'urql';
import { User, DashboardDocument } from '@/generated/generated-graphql';
import { UserDashboardSkeleton } from '@/components/skeletons';
import DefaultUserIcon from '@/components/DefaultUserIcon';

export default function UserDashboard() {
  const { user } = useAuth();
  
  const [{ data: dashboardData, fetching: dashboardFetching }] = useQuery({
    query: DashboardDocument,
    variables: user?.handle_name ? { handle_name: user.handle_name } : undefined,
    pause: !user?.handle_name,
  });

  if (!user) return null;
  if (dashboardFetching) return <UserDashboardSkeleton />;

  const profile = dashboardData?.UserProfile as User | undefined;
  const artworksCount = profile?.artworks?.length || 0;
  const commentsCount = profile?.comments?.length || 0;
  const followingCount = profile?.following?.length || 0;
  const totalLikesReceived: number = dashboardData?.getMyTotalFavorites ?? 0;
  const totalBookmarksReceived: number = dashboardData?.getMyTotalBookmarks ?? 0;
  const totalLikesGiven: number = dashboardData?.getMyFavoritesGiven ?? 0;
  const totalBookmarksGiven: number = dashboardData?.getMyBookmarksGiven ?? 0;

  const statsData = [
    {
      title: '作品数',
      value: artworksCount.toString(),
      icon: <ArtworkIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'コメント数',
      value: commentsCount.toString(),
      icon: <CommentIcon sx={{ fontSize: 40 }} />,
      color: '#388e3c',
    },
    {
      title: 'フォロー数',
      value: followingCount.toString(),
      icon: <FollowIcon sx={{ fontSize: 40 }} />,
      color: '#f57c00',
    },
  ];

  const rankStatsData = [
    {
      title: '受け取ったお気に入り',
      value: totalLikesReceived.toString(),
      icon: <ViewIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
    {
      title: '付けたお気に入り',
      value: totalLikesGiven.toString(),
      icon: <ViewIcon sx={{ fontSize: 40 }} />,
      color: '#7b1fa2',
    },
    {
      title: '受け取ったブックマーク',
      value: totalBookmarksReceived.toString(),
      icon: <BookmarkIcon sx={{ fontSize: 40 }} />,
      color: '#e91e63',
    },
    {
      title: '付けたブックマーク',
      value: totalBookmarksGiven.toString(),
      icon: <BookmarkIcon sx={{ fontSize: 40 }} />,
      color: '#ad1457',
    },
  ];

  const quickActions = [
    {
      title: '新しい作品を投稿',
      description: '作品を投稿して皆と共有しましょう',
      icon: <AddIcon />,
      href: '/artworks/add',
      color: '#1976d2',
    },
    {
      title: '作品を探す',
      description: '他のユーザーの素敵な作品を発見',
      icon: <ViewIcon />,
      href: '/artworks',
      color: '#388e3c',
    },
    {
      title: 'プロフィール編集',
      description: 'あなたのプロフィールを更新',
      icon: <EditIcon />,
      href: `/profile/${user.handle_name}`,
      color: '#f57c00',
    },
  ];


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Head>
        <title>ダッシュボード - Polygonal Auxions</title>
      </Head>
      
      {/* Welcome Section */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: { xs: 'center', sm: 'left' }
      }}>
        <DefaultUserIcon
          name={user.handle_name}
          imagePath={user.user_files?.[0]?.file_path}
          furtherProp={{ width: 56, height: 56, fontSize: 28 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            こんにちは、{profile?.name || user.handle_name}さん
          </Typography>
          <Typography variant="body1" color="textSecondary">
            今日も素敵な作品作りを楽しみましょう！
          </Typography>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat) => (
          <Grid key={stat.title} size={{ xs: 6, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Rank Statistics (separate row) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {rankStatsData.map((stat) => (
          <Grid key={stat.title} size={{ xs: 6, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          クイックアクション
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action) => (
            <Grid key={action.href} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Box sx={{ color: action.color }}>
                      {action.icon}
                    </Box>
                    <Typography variant="h6">
                      {action.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {action.description}
                  </Typography>
                  <Button
                    component={Link}
                    href={action.href}
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: action.color }}
                  >
                    開始
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      {profile && (
        <Box>
          <Typography variant="h5" gutterBottom>
            最近の活動
          </Typography>
          <Grid container spacing={3}>
            {/* Recent Artworks */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    最新の作品
                  </Typography>
                  {profile?.artworks && profile.artworks.length > 0 ? (
                    <Box>
                      {profile.artworks.slice(0, 3).map((artwork) => (
                        <Box key={artwork.slug_id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                          <Typography variant="subtitle1">
                            {artwork.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {artwork.favoritesCount} お気に入り • {new Date(artwork.created_at).toLocaleDateString('ja-JP')}
                          </Typography>
                        </Box>
                      ))}
                      {profile.artworks.length > 3 && (
                        <Button component={Link} href={`/profile/${user.handle_name}`} variant="text">
                          すべての作品を見る
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      まだ作品がありません。最初の作品を投稿してみましょう！
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Comments */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    最近のコメント
                  </Typography>
                  {profile?.comments && profile.comments.length > 0 ? (
                    <Box>
                      {profile.comments.slice(0, 3).map((comment) => (
                        <Box key={comment.slug_id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            &ldquo;{comment.body}&rdquo;
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {comment.artwork.title} • {new Date(comment.created_at).toLocaleDateString('ja-JP')}
                          </Typography>
                        </Box>
                      ))}
                      {profile.comments.length > 3 && (
                        <Button component={Link} href={`/profile/${user.handle_name}`} variant="text">
                          すべてのコメントを見る
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      まだコメントがありません。他のユーザーの作品にコメントしてみましょう！
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
