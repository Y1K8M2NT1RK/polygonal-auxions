import {
    Box,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { ReactNode, ReactElement } from 'react';


type AlertDialogProps = {
    button: ReactElement;
    isDialogOpen: boolean;
    content: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function AlertDialog({ button, isDialogOpen, content, onConfirm, onCancel }: AlertDialogProps) {
    return (
        <Box>
            {button}
            <Dialog open={isDialogOpen} onClose={onCancel}>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={onConfirm}>はい</Button>
                    <Button onClick={onCancel}>いいえ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}