import {
    Box,
    Container,
    Skeleton,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

export default function UserDashboardSkeleton() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Welcome section */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3, 
                mb: 4,
                textAlign: { xs: 'center', sm: 'left' }
            }}>
                <Skeleton variant="circular" width={56} height={56} />
                <Box>
                    <Skeleton variant="text" width={250} height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width={200} />
                </Box>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 6, md: 4 }}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Skeleton variant="text" width={80} height={20} />
                                        <Skeleton variant="text" width={60} height={35} />
                                    </Box>
                                    <Skeleton variant="circular" width={24} height={24} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Rank Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Skeleton variant="text" width={60} height={18} />
                                        <Skeleton variant="text" width={40} height={35} />
                                    </Box>
                                    <Skeleton variant="circular" width={20} height={20} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Quick Actions */}
            <Box sx={{ mb: 4 }}>
                <Skeleton variant="text" width={150} height={35} sx={{ mb: 2 }} />
                <Grid container spacing={3}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <Skeleton variant="text" width={100} />
                                    </Box>
                                    <Skeleton variant="text" width="100%" />
                                    <Skeleton variant="text" width="80%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}