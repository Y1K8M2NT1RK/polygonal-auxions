import {
    Grid,
    Paper,
    Box,
    Skeleton,
} from '@mui/material';

interface ArtworkListSkeletonProps {
    count?: number;
}

export default function ArtworkListSkeleton({ count = 6 }: ArtworkListSkeletonProps) {
    return (
        <Grid container spacing={2}>
            {Array.from({ length: count }).map((_, index) => (
                <Grid 
                    key={index}
                    size={{ xs: 12, md: 6, lg: 4 }}
                >
                    <Paper sx={{ width: '100%' }} elevation={9}>
                        {/* User info section */}
                        <Box sx={{ p: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Skeleton 
                                    variant="circular" 
                                    width={40} 
                                    height={40} 
                                    sx={{ mr: '10px' }}
                                />
                                <Skeleton variant="text" width={80} />
                            </Box>
                            <Skeleton variant="circular" width={24} height={24} />
                        </Box>
                        
                        {/* Image section - matches CardActionArea height of 15em */}
                        <Box sx={{ height: "15em", display: 'flex', flexDirection: 'column' }}>
                            <Skeleton 
                                variant="rectangular" 
                                width="100%" 
                                height="100%"
                                sx={{ borderRadius: 1 }}
                            />
                        </Box>
                        
                        {/* Title and date section */}
                        <Box sx={{ px: '10px', py: '5px' }}>
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="60%" />
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
}