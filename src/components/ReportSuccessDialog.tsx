import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ReportSuccessDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main' }} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          報告が完了しました
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ご報告いただき、ありがとうございます。
          <br />
          報告内容を確認し、適切に対応いたします。
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}