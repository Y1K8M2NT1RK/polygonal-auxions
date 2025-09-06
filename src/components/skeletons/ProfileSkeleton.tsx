import {
    Container,
    Box,
    Skeleton,
    Paper,
    Grid,
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

            {/* Content Area (Artworks grid) */}
            <Grid container spacing={2}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper elevation={2}>
                            <Skeleton 
                                variant="rectangular" 
                                width="100%" 
                                height={200}
                                sx={{ borderRadius: '4px 4px 0 0' }}
                            />
                            <Box sx={{ p: 1 }}>
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="60%" />
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}