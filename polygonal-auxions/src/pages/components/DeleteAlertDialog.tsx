import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';
import { useState, ReactNode, ReactElement } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


type AlertDialogProps = {
    content: ReactNode;
    onConfirm: () => void;
};

export default function AlertDialog({ content, onConfirm }: AlertDialogProps) {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <Box>
            <Typography variant='button' color="error" onClick={handleClickOpen}><DeleteForeverIcon /> 削除</Typography>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>はい</Button>
                    <Button onClick={handleClose}>いいえ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}