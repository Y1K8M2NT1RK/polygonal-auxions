import {
    Container,
    Card,
    CardContent,
    Box,
    Skeleton,
} from '@mui/material';

export default function FormPageSkeleton() {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto', mb: 3 }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 3 }} />
                    
                    <Box sx={{ textAlign: 'left' }}>
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2, borderRadius: 1 }} />
                        <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 3, borderRadius: 1 }} />
                        <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1 }} />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}