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
    return (
        <Box>
            <Dialog open={isDialogOpen} onClose={onClose}>
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