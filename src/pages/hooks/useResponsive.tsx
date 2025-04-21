import { useTheme, useMediaQuery } from '@mui/material';

export default function useResponsive(): [
    isSmallScreen: boolean,
    isMediumScreen: boolean,
    isLargeScreen: boolean,
] {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return [isSmallScreen, isMediumScreen, isLargeScreen];
}