import {
    Container,
    Box,
    Skeleton,
    Paper,
    Grid,
} from '@mui/material';

export default function ArtworkDetailSkeleton() {
    return (
        <Container sx={{ my: 2 }}>
            <Grid container spacing={3}>
                {/* Main artwork section */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 2 }} elevation={3}>
                        {/* User info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                            <Skeleton variant="text" width={120} />
                        </Box>
                        
                        {/* Main image */}
                        <Skeleton 
                            variant="rectangular" 
                            width="100%" 
                            height={400}
                            sx={{ mb: 2, borderRadius: 1 }}
                        />
                        
                        {/* Title and description */}
                        <Skeleton variant="text" width="70%" height={40} sx={{ mb: 1 }} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="60%" />
                    </Paper>
                </Grid>
                
                {/* Sidebar */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 2 }} elevation={3}>
                        <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="100%" sx={{ mb: 3 }} />
                        
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                    </Paper>
                    
                    {/* Comments section */}
                    <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
                        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                                    <Skeleton variant="text" width={80} />
                                </Box>
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="70%" />
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}