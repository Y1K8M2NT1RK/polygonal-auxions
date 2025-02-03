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
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../contexts/AuthContexts';
import useResponsive from "../hooks/useResponsive";
import useDarkMode from "../hooks/useDarkMode";

type LoginDialogProps = {
    sxProps?: {
        [key: string]: SxProps<Theme>;
    };
};

type FormData = {
    email: string;
    password: string;
};

export default function LoginDialog({ sxProps }: LoginDialogProps) {
    const {register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm<FormData>({
        defaultValues: {email: '', password: ''},
        mode: 'onSubmit',
    });

    const { handleLogin, formErrors } = useAuth();
    const onSubmit = handleSubmit(async (data: FormData) => await handleLogin(data.email, data.password));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {clearErrors(); setOpen(false);};

    const isDarkMode = useDarkMode();
    const { isSmallScreen, isMediumScreen } = useResponsive();
    const fullScreen = isSmallScreen || isMediumScreen;

    useEffect(() => {
        for (const [key, val] of Object.entries(formErrors)) {
            setError(`root.${key}`, {type: 'server', message: val[0]});
        }
    }, [formErrors, setError]);

    return (
        <Box sx={sxProps?.Box}>
            <Button onClick={handleClickOpen} color="inherit" sx={sxProps?.Button}>
                ログイン
            </Button>
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
                    <CardContent sx={{textAlign: 'center'}}>
                        <Typography variant="h5">ログイン</Typography>
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
                        <Box component="form" method="POST" onSubmit={onSubmit}>
                            <TextField
                                fullWidth
                                size="small"
                                label="メールアドレス/ハンドルネーム"
                                {...register("email")}
                                error={!!errors?.root?.email?.message}
                                helperText={errors?.root?.email?.message ? errors?.root?.email?.message : null}
                                sx={{mt: 2}}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                type="password"
                                label="パスワード"
                                autoComplete="on"
                                {...register("password")}
                                error={!!errors?.root?.password?.message}
                                helperText={errors?.root?.password?.message ? errors?.root?.password?.message : null}
                                sx={{mt: 2}}
                            />
                            <Box display='flex' flexDirection='column'>
                                <Fab
                                    component={Button}
                                    type="submit"
                                    color="inherit"
                                    variant="extended"
                                    sx={{mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                >ログイン <LoginIcon /></Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                >アカウント作成</Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    size="small"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: isDarkMode?'#444444':'#CCCCCC'}}
                                >パスワードを忘れたときは</Fab>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
        </Box>
    );
}