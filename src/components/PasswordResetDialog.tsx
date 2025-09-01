import { 
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    Fab,
    IconButton,
    SxProps,
    TextField,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
    Alert,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import { useForm } from "react-hook-form";
import useResponsive from "@/hooks/useResponsive";
import useDarkMode from "@/hooks/useDarkMode";

type PasswordResetDialogProps = {
    open: boolean;
    onClose: () => void;
    onRequestPasswordReset: (emailOrHandle: string) => Promise<{ success: boolean; token?: string }>;
};

type FormData = {
    emailOrHandle: string;
};

export default function PasswordResetDialog({ open, onClose, onRequestPasswordReset }: PasswordResetDialogProps) {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormData>({
        defaultValues: { emailOrHandle: '' },
        mode: 'onSubmit',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [resetToken, setResetToken] = useState<string | null>(null);

    const isDarkMode = useDarkMode();
    const { isSmallScreen, isMediumScreen } = useResponsive();
    const fullScreen = isSmallScreen || isMediumScreen;

    const onSubmit = handleSubmit(async (data: FormData) => {
        setIsLoading(true);
        clearErrors();
        
        try {
            const result = await onRequestPasswordReset(data.emailOrHandle);
            if (result.success) {
                setIsSuccess(true);
                setResetToken(result.token || null);
            }
        } catch (error) {
            setError('emailOrHandle', { 
                type: 'server', 
                message: 'パスワードリセットの送信に失敗しました。もう一度お試しください。' 
            });
        } finally {
            setIsLoading(false);
        }
    });

    const handleClose = () => {
        clearErrors();
        setIsSuccess(false);
        setResetToken(null);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
        >
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: `${fullScreen == true ? "100vh" : "0"}`,
                }}
            >
                <CardContent sx={{ textAlign: 'center', maxWidth: 400 }}>
                    <Typography variant="h5">パスワードリセット</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {isSuccess ? (
                        <Box sx={{ mt: 3 }}>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                パスワードリセットメールを送信しました。
                            </Alert>
                            <Typography variant="body2" color="text.secondary">
                                メールに記載されたリンクからパスワードをリセットしてください。
                                メールが届かない場合は、迷惑メールフォルダもご確認ください。
                            </Typography>
                            
                            {/* Temporary reset button with reset-token parameter */}
                            {resetToken && (
                                <Box sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        暫定対応：下記ボタンから直接パスワードリセットページにアクセスできます。
                                    </Typography>
                                    <Button 
                                        variant="outlined"
                                        href={`/reset-password?reset-token=${resetToken}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ mt: 1 }}
                                    >
                                        パスワードリセットページへ
                                    </Button>
                                </Box>
                            )}
                            
                            <Button 
                                onClick={handleClose} 
                                variant="contained" 
                                sx={{ mt: 2 }}
                            >
                                閉じる
                            </Button>
                        </Box>
                    ) : (
                        <Box component="form" method="POST" onSubmit={onSubmit}>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
                                メールアドレスまたはハンドルネームを入力してください。
                                パスワードリセット用のメールをお送りします。
                            </Typography>
                            
                            <TextField
                                fullWidth
                                size="small"
                                label="メールアドレス/ハンドルネーム"
                                {...register("emailOrHandle", {
                                    required: "入力してください",
                                    minLength: {
                                        value: 1,
                                        message: "入力してください"
                                    }
                                })}
                                error={!!errors.emailOrHandle}
                                helperText={errors.emailOrHandle?.message}
                                sx={{ mt: 2 }}
                                disabled={isLoading}
                            />
                            
                            <Box display='flex' flexDirection='column'>
                                <Fab
                                    component={Button}
                                    type="submit"
                                    color="inherit"
                                    variant="extended"
                                    disabled={isLoading}
                                    sx={{ mt: 2, backgroundColor: isDarkMode ? '#444444' : '#CCCCCC' }}
                                >
                                    {isLoading ? '送信中...' : 'メール送信'} <EmailIcon />
                                </Fab>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Dialog>
    );
}