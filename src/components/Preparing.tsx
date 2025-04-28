import { Container, Box, Typography, Button } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import React from 'react';

export default function Preparing() {
    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                }}
            >
                <ConstructionIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6">準備中...</Typography>
            </Box>
            <Button href={'/artworks'}>検索しないで作品を見る</Button>
        </Container>
    );
}