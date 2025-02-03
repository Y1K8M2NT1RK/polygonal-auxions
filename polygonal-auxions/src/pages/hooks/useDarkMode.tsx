import { useTheme, createTheme, useMediaQuery } from '@mui/material';

export default function useDarkMode() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return isDarkMode;
}