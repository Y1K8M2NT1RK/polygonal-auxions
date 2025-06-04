import useResponsive from '@/hooks/useResponsive';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { ReactElement } from 'react';

type ListDialogProps = {
    isDialogOpen: boolean;
    headerContent?: ReactElement;
    bodyContent: ReactElement;
    onClose: () => void;
};

export default function ListDialog({
        isDialogOpen,
        headerContent,
        bodyContent,
        onClose
    }: ListDialogProps
) {
    const {isSmallScreen} = useResponsive();
    return (
        <Box>
            <Dialog open={isDialogOpen} onClose={onClose} fullScreen={isSmallScreen}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'center',}}>{headerContent}</Box>
                </ DialogTitle>
                <DialogContent sx={{ height: '600px', }}>
                    <Box>{bodyContent}</Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}