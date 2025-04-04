import SearchInput from '@/pages/components/SearchInput';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import useResponsive from '@/pages/hooks/useResponsive';
import LoginDialog from '@/pages/components/LoginDialog';

type SxObject = {
    [key: string]: SxProps<Theme>;
};

export default function NotLoggedIn() {
    const { isSmallScreen, isMediumScreen } = useResponsive();
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
                <LoginDialog sxProps={LoginButtonSx} />
            </Box>
        </Box>
    );
}