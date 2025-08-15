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
import { UserProfileDocument } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/components/DefaultUserIcon';

export default function UserDashboard() {
  const { user } = useAuth();
  
  // Get full user profile data including artworks and comments
  const [{ data: profileData, fetching: profileFetching }] = useQuery({
    query: UserProfileDocument,
    variables: user?.handle_name ? { handle_name: user.handle_name } : undefined,
    pause: !user?.handle_name,
  });

  if (!user) return null;

  const profile = profileData?.UserProfile;
  const artworksCount = profile?.artworks?.length || 0;
  const commentsCount = profile?.comments?.length || 0;
  const followingCount = profile?.following?.length || 0;

  // Calculate total likes across all artworks
  const totalLikes = profile?.artworks?.reduce((sum, artwork) => sum + artwork.likes, 0) || 0;
  
  // Calculate total bookmarks - placeholder for future implementation
  const totalBookmarks = 0; // This will be implemented when bookmarks are added to the GraphQL schema

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
    {
      title: '総いいね数',
      value: totalLikes.toString(),
      icon: <ViewIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
    {
      title: '総ブックマーク数',
      value: totalBookmarks.toString(),
      icon: <BookmarkIcon sx={{ fontSize: 40 }} />,
      color: '#e91e63',
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
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <DefaultUserIcon
          name={user.handle_name}
          imagePath={user.user_files?.[0]?.file_path}
          furtherProp={{ width: 56, height: 56, fontSize: 28 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            こんにちは、{profile?.name || user.handle_name}さん
          </Typography>
          <Typography variant="body1" color="textSecondary">
            今日も素敵な作品作りを楽しみましょう！
          </Typography>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid key={index} item xs={6} sm={6} md={4} lg={2}>
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

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          クイックアクション
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid key={index} item xs={12} md={4}>
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
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    最新の作品
                  </Typography>
                  {profile.artworks.length > 0 ? (
                    <Box>
                      {profile.artworks.slice(0, 3).map((artwork) => (
                        <Box key={artwork.slug_id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                          <Typography variant="subtitle1">
                            {artwork.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {artwork.likes} いいね • {new Date(artwork.created_at).toLocaleDateString('ja-JP')}
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
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    最近のコメント
                  </Typography>
                  {profile.comments.length > 0 ? (
                    <Box>
                      {profile.comments.slice(0, 3).map((comment, index) => (
                        <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
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