import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    CircularProgress
} from '@mui/material';
import { NextPage } from 'next';
import { useMutation } from 'urql';
import { ResetPasswordDocument } from '@/generated/generated-graphql';
import useDarkMode from '@/hooks/useDarkMode';

type FormData = {
    password: string;
    passwordConfirmation: string;
};

const ResetPasswordPage: NextPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const isDarkMode = useDarkMode();

    const [resetPasswordResult, resetPassword] = useMutation(ResetPasswordDocument);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormData>({
        defaultValues: { password: '', passwordConfirmation: '' },
        mode: 'onSubmit',
    });

    // Check if token is present
    useEffect(() => {
        if (router.isReady && !token) {
            router.push('/');
        }
    }, [router.isReady, token, router]);

    const onSubmit = handleSubmit(async (data: FormData) => {
        if (!token || typeof token !== 'string') {
            setServerError('無効なトークンです。');
            return;
        }

        clearErrors();
        setServerError(null);

        try {
            const result = await resetPassword({
                token: token,
                password: data.password,
                passwordConfirmation: data.passwordConfirmation,
            });

            if (result.error) {
                setServerError('パスワードリセットに失敗しました。');
                return;
            }

            if (result.data?.resetPassword.__typename === 'ZodError') {
                const zodError = result.data.resetPassword;
                if (zodError.fieldErrors) {
                    zodError.fieldErrors.forEach((fieldError: any) => {
                        if (fieldError.message) {
                            const field = fieldError.message.includes('確認') ? 'passwordConfirmation' : 'password';
                            setError(field, { type: 'server', message: fieldError.message });
                        }
                    });
                }
                if (zodError.message) {
                    setServerError(zodError.message);
                }
                return;
            }

            if (result.data?.resetPassword.__typename === 'MutationResetPasswordSuccess') {
                setIsSuccess(true);
                // Redirect to home page after successful reset
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Password reset error:', error);
            setServerError('予期しないエラーが発生しました。もう一度お試しください。');
        }
    });

    if (!router.isReady) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!token) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error">
                    無効なパスワードリセットリンクです。
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        パスワードリセット
                    </Typography>

                    {isSuccess ? (
                        <Box>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                パスワードが正常にリセットされました！
                            </Alert>
                            <Typography variant="body2" color="text.secondary">
                                自動的にログインしました。3秒後にホームページにリダイレクトします...
                            </Typography>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={onSubmit}>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                新しいパスワードを入力してください。
                            </Typography>

                            {serverError && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {serverError}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                type="password"
                                label="新しいパスワード"
                                autoComplete="new-password"
                                {...register("password", {
                                    required: "パスワードを入力してください",
                                    minLength: {
                                        value: 4,
                                        message: "パスワードは4文字以上で入力してください"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{ mb: 2 }}
                                disabled={resetPasswordResult.fetching}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="パスワード確認"
                                autoComplete="new-password"
                                {...register("passwordConfirmation", {
                                    required: "パスワード確認を入力してください"
                                })}
                                error={!!errors.passwordConfirmation}
                                helperText={errors.passwordConfirmation?.message}
                                sx={{ mb: 3 }}
                                disabled={resetPasswordResult.fetching}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={resetPasswordResult.fetching}
                                sx={{
                                    backgroundColor: isDarkMode ? '#444444' : '#1976d2',
                                    '&:hover': {
                                        backgroundColor: isDarkMode ? '#555555' : '#1565c0'
                                    }
                                }}
                            >
                                {resetPasswordResult.fetching ? '処理中...' : 'パスワードをリセット'}
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ResetPasswordPage;