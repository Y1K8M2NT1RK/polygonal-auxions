import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts';
import type { GetReportReasonsQuery } from '@/generated/generated-graphql';

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  onReportSubmit: (rankId: string) => Promise<void>;
  reportReasons: GetReportReasonsQuery['getReportReasons'];
  loading?: boolean;
};

export default function UserReportDialog({
  open,
  onClose,
  userId,
  userName,
  onReportSubmit,
  reportReasons,
  loading = false,
}: Props) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedReason || !user) return;

    setSubmitting(true);
    try {
      await onReportSubmit(selectedReason);
      setSelectedReason('');
      onClose();
    } catch (error) {
      console.error('Error submitting user report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    onClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        ユーザーの報告
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            ユーザー: {userName}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          報告理由を選択してください：
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedReason}
              onChange={handleReasonChange}
            >
              {reportReasons.map((reason) => (
                <FormControlLabel
                  key={reason.id}
                  value={reason.id}
                  control={<Radio />}
                  label={reason.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={submitting}>
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedReason || submitting || loading}
        >
          {submitting ? <CircularProgress size={20} /> : '報告'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}