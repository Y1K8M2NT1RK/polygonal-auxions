import {
    Box,
    Skeleton,
    Container,
    Paper,
} from '@mui/material';

export default function AdminRedirectSkeleton() {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                gap={3}
            >
                <Paper sx={{ p: 4, width: '100%', textAlign: 'center' }} elevation={3}>
                    <Skeleton variant="text" width="60%" height={30} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 3 }} />
                    <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
                </Paper>
            </Box>
        </Container>
    );
}