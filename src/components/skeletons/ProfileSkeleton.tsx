import {
    Container,
    Box,
    Skeleton,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActionArea,
} from '@mui/material';

export default function ProfileSkeleton() {
    return (
        <Container sx={{ my: 2 }}>
            {/* Profile Header */}
            <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Skeleton variant="circular" width={100} height={100} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width={180} height={40} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="80%" />
                    </Box>
                </Box>
            </Paper>

            {/* Profile Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 4 }}>
                        <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
                            <Skeleton variant="text" width={60} height={30} sx={{ mx: 'auto', mb: 1 }} />
                            <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Tab Navigation */}
            <Paper sx={{ mb: 2 }} elevation={1}>
                <Box sx={{ display: 'flex', p: 1 }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton 
                            key={index}
                            variant="rectangular" 
                            width={80} 
                            height={32} 
                            sx={{ mr: 1, borderRadius: 1 }} 
                        />
                    ))}
                </Box>
            </Paper>

            {/* Content Area (Artworks list) - 読み込み後の ProfileTabs に合わせた横並び */}
            <Grid container spacing={1}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 12 }} sx={{ width: '100%' }}>
                        <Card sx={{ p: '10px', mb: 1 }} elevation={2}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                {/* 左: サムネイル領域（高さ100px・アスペクト比 5/3 を模倣） */}
                                <CardActionArea sx={{ height: '100px', aspectRatio: '5 / 3', flexShrink: 0 }}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
                                        <Skeleton 
                                            variant="rectangular" 
                                            width="100%" 
                                            height="100%"
                                            sx={{ borderRadius: 1 }}
                                        />
                                    </CardContent>
                                </CardActionArea>
                                {/* 右: タイトル/テキスト領域 */}
                                <CardContent sx={{ py: 0, flex: 1 }}>
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="text" width="40%" />
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}