import SearchInput from '@/components/SearchInput';
import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import useResponsive from '@/hooks/useResponsive';
import LoginDialog from '@/components/LoginDialog';
import { useState } from 'react';
import Link from 'next/link';

type SxObject = {
    [key: string]: SxProps<Theme>;
};

export default function NotLoggedIn() {
    const {isSmallScreen, isMediumScreen} = useResponsive();

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    const LoginButtonSx: SxObject = {
        Box: {width: '100%',  display: 'flex', justifyContent: 'center'},
        Button: {
            fontSize: isSmallScreen ? '1rem' : '1.25rem',
            borderRadius: '100px',
            padding: '0.75rem 1rem',
            width: isSmallScreen ? '85%' : '90%',
        },
    }
    
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: isSmallScreen || isMediumScreen ? 'column' : 'row',
                justifyContent: 'space-evenly',
                height: '100vh',
                margin: '0 1rem auto',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginInline: '2rem',
                    marginBottom: isSmallScreen ? '0.5rem' : '0',
                    width: '100%',
                }}
            >
                Polygonal Auxions
            </Typography>
            <Box sx={{ 
                width: '100%',
                height: '30%',
                display: 'flex',
                flexFlow: 'column', 
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <SearchInput
                    labelFontSize={isSmallScreen ? '1rem' : '1.25rem'}
                    inputFontSize={isSmallScreen ? '1rem' : '1.25rem'}
                />
                <Button component={Link} href={'/artworks'}>検索しないで作品を見る</Button>
                <LoginDialog
                    button={
                        <Button onClick={handleDialogOpen} color="inherit" sx={LoginButtonSx.Box}>
                            ログイン
                        </Button>
                    }
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                />
            </Box>
        </Box>
    );
}