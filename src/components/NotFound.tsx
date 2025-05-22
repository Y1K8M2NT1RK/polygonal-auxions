import { Container, Box, Typography, Button } from '@mui/material';
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
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
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">見つかりませんでした。</Typography>
            </Box>
            <Button component={Link} href={'/artworks'}>作品一覧へ戻る</Button>
        </Container>
    );
}