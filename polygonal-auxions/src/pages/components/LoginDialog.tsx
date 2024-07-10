import { 
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    Fab,
    Hidden,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';


export default function LoginDialog(){

    {/* フォームの管理 */}
    const {register, handleSubmit} = useForm();
    const onSubmit = handleSubmit((data) => signIn("credentials", {...data, redirect:false})
        .then((res) => {
            if(res?.ok) toast.success('ログインできたよ。');
            if(res?.error) toast.error('ログインできないよ。');
        })
    );

    {/* ダイアログの開閉 */}
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    {/* ダイアログの開閉 */}
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <Button onClick={handleClickOpen} color="inherit">
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
                                color: (theme) => theme.palette.grey[500],
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
                                sx={{mt: 2}}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                type="password"
                                label="パスワード"
                                autoComplete="on"
                                {...register("password")}
                                sx={{mt: 2}}
                            />
                            <Box display='flex' flexDirection='column'>
                                <Fab
                                    component={Button}
                                    type="submit"
                                    color="inherit"
                                    variant="extended"
                                    sx={{mt: 2, backgroundColor: '#444444'}}
                                >ログイン <LoginIcon /></Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: '#444444'}}
                                >アカウント作成</Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    size="small"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: '#444444'}}
                                >パスワードを忘れたときは</Fab>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
        </Box>
    );
}