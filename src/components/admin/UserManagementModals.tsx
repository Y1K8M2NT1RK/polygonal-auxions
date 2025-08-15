import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// Note: ja locale might not be available, using default
import { useForm, Controller } from 'react-hook-form';

interface User {
  id?: string;
  handle_name: string;
  name: string;
  name_kana?: string;
  email: string;
  phone_number?: string;
  address?: string;
  introduction?: string;
  birthday?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  user_files?: any[];
  artworks?: any[];
  comments?: any[];
}

interface UserFormData {
  handle_name: string;
  name: string;
  name_kana: string;
  email: string;
  phone_number: string;
  address: string;
  introduction: string;
  birthday: Date | null;
  password?: string;
}

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

interface UserEditModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (data: UserFormData) => void;
  loading?: boolean;
}

interface UserCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: UserFormData & { password: string }) => void;
  loading?: boolean;
}

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  loading?: boolean;
}

// User Detail Modal
export function UserDetailModal({ open, onClose, user }: UserDetailModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        ユーザー詳細: {user.name}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              value={user.id || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ハンドルネーム"
              value={user.handle_name || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="名前"
              value={user.name || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ふりがな"
              value={user.name_kana || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="メールアドレス"
              value={user.email || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="電話番号"
              value={user.phone_number || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="住所"
              value={user.address || ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="自己紹介"
              value={user.introduction || ''}
              fullWidth
              disabled
              multiline
              rows={3}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="生年月日"
              value={user.birthday ? new Date(user.birthday).toLocaleDateString('ja-JP') : ''}
              fullWidth
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="textSecondary">
                ロール:
              </Typography>
              <Chip
                label={user.role === 'ADMIN' ? '管理者' : 'ユーザー'}
                color={user.role === 'ADMIN' ? 'primary' : 'default'}
                size="small"
              />
            </Box>
          </Grid>
          
          {/* Display related data */}
          {user.artworks && user.artworks.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                最近の作品 ({user.artworks.length}件)
              </Typography>
              <List dense>
                {user.artworks.slice(0, 5).map((artwork: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={artwork.title}
                      secondary={new Date(artwork.created_at).toLocaleDateString('ja-JP')}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}

          {user.comments && user.comments.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                最近のコメント ({user.comments.length}件)
              </Typography>
              <List dense>
                {user.comments.slice(0, 3).map((comment: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${comment.artwork?.title || '作品'} へのコメント`}
                      secondary={`${comment.body.substring(0, 100)}... - ${new Date(comment.created_at).toLocaleDateString('ja-JP')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
}

// User Create Modal
export function UserCreateModal({ open, onClose, onCreate, loading }: UserCreateModalProps) {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UserFormData & { password: string }>({
    defaultValues: {
      handle_name: '',
      name: '',
      name_kana: '',
      email: '',
      phone_number: '',
      address: '',
      introduction: '',
      birthday: null,
      password: '',
    },
  });

  const onSubmit = (data: UserFormData & { password: string }) => {
    onCreate(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>新規ユーザー作成</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ハンドルネーム *"
                fullWidth
                size="small"
                {...register('handle_name', {
                  required: 'ハンドルネームは必須です',
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: '英数字、アンダースコア、ハイフンのみ使用できます'
                  },
                  maxLength: { value: 60, message: '60文字以内で入力してください' }
                })}
                error={!!errors.handle_name}
                helperText={errors.handle_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="名前 *"
                fullWidth
                size="small"
                {...register('name', {
                  required: '名前は必須です',
                  maxLength: { value: 25, message: '25文字以内で入力してください' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ふりがな"
                fullWidth
                size="small"
                {...register('name_kana', {
                  maxLength: { value: 50, message: '50文字以内で入力してください' }
                })}
                error={!!errors.name_kana}
                helperText={errors.name_kana?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="メールアドレス *"
                type="email"
                fullWidth
                size="small"
                {...register('email', {
                  required: 'メールアドレスは必須です',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '正しいメールアドレスを入力してください'
                  },
                  maxLength: { value: 150, message: '150文字以内で入力してください' }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="パスワード *"
                type="password"
                fullWidth
                size="small"
                {...register('password', {
                  required: 'パスワードは必須です',
                  minLength: { value: 4, message: '4文字以上で入力してください' },
                  maxLength: { value: 100, message: '100文字以内で入力してください' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="電話番号"
                fullWidth
                size="small"
                {...register('phone_number', {
                  pattern: {
                    value: /^\d*$/,
                    message: '数字のみで入力してください'
                  },
                  maxLength: { value: 15, message: '15文字以内で入力してください' }
                })}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="住所"
                fullWidth
                size="small"
                {...register('address', {
                  maxLength: { value: 150, message: '150文字以内で入力してください' }
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="自己紹介"
                fullWidth
                multiline
                rows={3}
                size="small"
                {...register('introduction', {
                  maxLength: { value: 500, message: '500文字以内で入力してください' }
                })}
                error={!!errors.introduction}
                helperText={errors.introduction?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="生年月日"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          error: !!errors.birthday,
                          helperText: errors.birthday?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '作成中...' : '作成'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

// User Edit Modal
export function UserEditModal({ open, onClose, user, onSave, loading }: UserEditModalProps) {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<UserFormData>({
    defaultValues: {
      handle_name: '',
      name: '',
      name_kana: '',
      email: '',
      phone_number: '',
      address: '',
      introduction: '',
      birthday: null,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('handle_name', user.handle_name || '');
      setValue('name', user.name || '');
      setValue('name_kana', user.name_kana || '');
      setValue('email', user.email || '');
      setValue('phone_number', user.phone_number || '');
      setValue('address', user.address || '');
      setValue('introduction', user.introduction || '');
      setValue('birthday', user.birthday ? new Date(user.birthday) : null);
    }
  }, [user, setValue]);

  const onSubmit = (data: UserFormData) => {
    onSave(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>ユーザー編集: {user.name}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ハンドルネーム"
                fullWidth
                size="small"
                {...register('handle_name', {
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: '英数字、アンダースコア、ハイフンのみ使用できます'
                  },
                  maxLength: { value: 60, message: '60文字以内で入力してください' }
                })}
                error={!!errors.handle_name}
                helperText={errors.handle_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="名前"
                fullWidth
                size="small"
                {...register('name', {
                  maxLength: { value: 25, message: '25文字以内で入力してください' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ふりがな"
                fullWidth
                size="small"
                {...register('name_kana', {
                  maxLength: { value: 50, message: '50文字以内で入力してください' }
                })}
                error={!!errors.name_kana}
                helperText={errors.name_kana?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="メールアドレス"
                type="email"
                fullWidth
                size="small"
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '正しいメールアドレスを入力してください'
                  },
                  maxLength: { value: 150, message: '150文字以内で入力してください' }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="電話番号"
                fullWidth
                size="small"
                {...register('phone_number', {
                  pattern: {
                    value: /^\d*$/,
                    message: '数字のみで入力してください'
                  },
                  maxLength: { value: 15, message: '15文字以内で入力してください' }
                })}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="住所"
                fullWidth
                size="small"
                {...register('address', {
                  maxLength: { value: 150, message: '150文字以内で入力してください' }
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="自己紹介"
                fullWidth
                multiline
                rows={3}
                size="small"
                {...register('introduction', {
                  maxLength: { value: 500, message: '500文字以内で入力してください' }
                })}
                error={!!errors.introduction}
                helperText={errors.introduction?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="生年月日"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          error: !!errors.birthday,
                          helperText: errors.birthday?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            キャンセル
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '保存中...' : '保存'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

// Delete Confirmation Modal
export function DeleteConfirmModal({ open, onClose, onConfirm, userName, loading }: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="error">ユーザー削除確認</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          この操作は元に戻すことができません。
        </Alert>
        <Typography>
          以下のユーザーを削除してもよろしいですか？
        </Typography>
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" color="error">
            {userName}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          ※ ユーザーに関連するデータ（作品、コメント等）も削除される可能性があります。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          キャンセル
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
        >
          {loading ? '削除中...' : '削除'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}