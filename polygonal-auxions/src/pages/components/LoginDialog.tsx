import { 
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    Fab,
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
import { LoginDocument } from "@/pages/generated-graphql";
import { useMutation } from "urql";

type FormData = {
    email: string;
    password: string;
};

export default function LoginDialog(){

    {/* フォームの管理 */}
    const {register, handleSubmit, setError, clearErrors, formState: {errors} } = useForm<FormData>({
        defaultValues: {email: '', password: ''},
        mode: 'onSubmit',
    });

    {/* フォームの送信処理 */}
    const [loginDocumentResult, loginDocument] = useMutation(LoginDocument);
    const onSubmit = handleSubmit((data:FormData) => loginDocument(data).then(result => {
        if(result.error){
            const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
            for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
            toast.error('ログインできません。入力内容をお確かめください。');
            return;
        }
        signIn("credentials", {...data, redirect:false}).then((res) => {
            if(res?.error) toast.error('エラーが発生しました。'); return;
        });
        toast.success('ログインできました。');
        return;
    }));

    {/* ダイアログの開閉 */}
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {clearErrors(); setOpen(false);};

    {/* ダイアログの開閉（スマホサイズ） */}
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
                                    sx={{mt: 2, backgroundColor: theme.palette.mode=='dark'?'#444444':'#CCCCCC'}}
                                >ログイン <LoginIcon /></Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: theme.palette.mode=='dark'?'#444444':'#CCCCCC'}}
                                >アカウント作成</Fab>
                                <Fab
                                    component={Link}
                                    href="#"
                                    size="small"
                                    color="inherit"
                                    variant="extended"
                                    sx={{ mt: 2, backgroundColor: theme.palette.mode=='dark'?'#444444':'#CCCCCC'}}
                                >パスワードを忘れたときは</Fab>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Dialog>
        </Box>
    );
}