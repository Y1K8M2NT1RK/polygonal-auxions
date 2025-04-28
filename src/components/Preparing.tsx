import { Container, Box, Typography } from '@mui/material';
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
        </Container>
    );
}