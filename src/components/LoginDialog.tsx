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
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'urql';
import { useAuth } from '@/contexts/AuthContexts';
import useResponsive from "@/hooks/useResponsive";
import useDarkMode from "@/hooks/useDarkMode";
import PasswordResetDialog from "./PasswordResetDialog";
import { RequestPasswordResetDocument } from '@/generated/generated-graphql';
import { shouldShowPasswordReset } from '@/utils/passwordResetConditions';

type LoginDialogProps = {
    button?: ReactElement;
    openDialog: boolean;
    setOpenDialog: (openDialog: boolean) => void;
    sxProps?: {
        [key: string]: SxProps<Theme>;
    };
    isLockedInputExternally?: boolean | false;
};

type FormData = {
    email: string;
    password: string;
};

export default function LoginDialog({
    button,
    openDialog,
    setOpenDialog, 
    sxProps,
    isLockedInputExternally
}: LoginDialogProps) {
    const {register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm<FormData>({
        defaultValues: {email: '', password: ''},
        mode: 'onSubmit',
    });

    const [lockInput, setLockInput] = useState(false);
    const [passwordResetOpen, setPasswordResetOpen] = useState(false);
    
    const [, requestPasswordReset] = useMutation(RequestPasswordResetDocument);

    const { handleLogin, formErrors, isLoggedIn } = useAuth();

    const onSubmit = handleSubmit(async (data: FormData) => {
        // 送信後は入力のみロック。成功時はリロード、失敗時はこのダイアログを保持する。
        setLockInput(true);
        await handleLogin(data.email, data.password);
        // 失敗時のみここに戻ってくるので入力ロックを解除
        setLockInput(false);
    });

    const handleClose = useCallback(() => { clearErrors(); setOpenDialog(false); }, [clearErrors, setOpenDialog]);
    
    const handlePasswordResetOpen = () => {
        setPasswordResetOpen(true);
        setOpenDialog(false); // Close login dialog
    };
    const handlePasswordResetClose = () => setPasswordResetOpen(false);

    const handleRequestPasswordReset = async (emailOrHandle: string): Promise<{ success: boolean; token?: string }> => {
        const result = await requestPasswordReset({ emailOrHandle });
        
        if (result.error) {
            throw new Error('パスワードリセットの送信に失敗しました。');
        }

        if (result.data?.requestPasswordReset.__typename === 'ZodError') {
            throw new Error('入力内容に問題があります。');
        }

        if (result.data?.requestPasswordReset.__typename === 'MutationRequestPasswordResetSuccess') {
            return { 
                success: result.data.requestPasswordReset.success,
                token: result.data.requestPasswordReset.token || undefined
            };
        }
        
        return { success: false };
    };

    const isDarkMode = useDarkMode();
    const {isSmallScreen, isMediumScreen} = useResponsive();
    const fullScreen = isSmallScreen || isMediumScreen;

    useEffect(() => {
        for (const [key, val] of Object.entries(formErrors)) {
            setError(`root.${key}`, {type: 'server', message: val[0]});
        }
        if( isLockedInputExternally==true ) setLockInput(true);
        else if(!isLoggedIn) setLockInput(false);
    }, [formErrors, setError, isLockedInputExternally, isLoggedIn]);

    useEffect(() => { if(isLoggedIn) handleClose() }, [isLoggedIn, handleClose]);

    return (
        <Box sx={sxProps?.Box}>
            {button}
            <Dialog
                open={openDialog}
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
                    <CardContent sx={{textAlign: 'center'}}>
                        <Typography variant="h5">ログイン</Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ position: 'absolute', right: 10, top: 10 }}
                            disabled={lockInput}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box component="form" method="POST" onSubmit={onSubmit}>
                            <TextField
                                fullWidth
                                size="small"
                                label="メールアドレス/ハンドルネーム"
                                {...register("email")}
                                error={!!errors?.root?.email?.message}
                                helperText={errors?.root?.email?.message ? errors?.root?.email?.message : null}
                                sx={{mt: 2}}
                                disabled={lockInput}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                type="password"
                                label="パスワード"
                                {...register("password")}
                                error={!!errors?.root?.password?.message}
                                helperText={errors?.root?.password?.message ? errors?.root?.password?.message : null}
                                sx={{mt: 2}}
                                disabled={lockInput}
                            />
                            <Box display='flex' flexDirection='column'>
                                <Fab
                                    component={Button}
                                    type="submit"
                                    color="inherit"
                                    variant="extended"
                                    sx={{mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                    disabled={lockInput}
                                >
                                    ログイン <LoginIcon />
                                </Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                    disabled={lockInput}
                                >
                                    アカウント作成
                                </Fab>
                                {shouldShowPasswordReset() && (
                                    <Fab
                                        component={Button}
                                        onClick={handlePasswordResetOpen}
                                        size="small"
                                        color="inherit"
                                        variant="extended"
                                        sx={{ mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                        disabled={lockInput}
                                    >
                                        パスワードを忘れたときは
                                    </Fab>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
            
            <PasswordResetDialog 
                open={passwordResetOpen}
                onClose={handlePasswordResetClose}
                onRequestPasswordReset={handleRequestPasswordReset}
            />
        </Box>
    );
}