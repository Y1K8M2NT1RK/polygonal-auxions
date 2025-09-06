import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  People as PeopleIcon,
  Palette as ArtworkIcon,
  Comment as CommentIcon,
  Report as ReportIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';

// Dummy data for dashboard cards
const statsData = [
  {
    title: 'ユーザー数',
    value: '1,234',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    title: '作品数',
    value: '567',
    icon: <ArtworkIcon sx={{ fontSize: 40 }} />,
    color: '#388e3c',
  },
  {
    title: 'コメント数',
    value: '2,890',
    icon: <CommentIcon sx={{ fontSize: 40 }} />,
    color: '#f57c00',
  },
  {
    title: '報告数',
    value: '23',
    icon: <ReportIcon sx={{ fontSize: 40 }} />,
    color: '#d32f2f',
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        ダッシュボード
      </Typography>
      
      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid key={stat.title} size={{xs: 12, sm: 6, md: 3}}>
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

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          システム概要
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1">
              管理画面へようこそ。こちらから各種管理機能にアクセスできます。
              サイドバーのメニューから目的の機能を選択してください。
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
}