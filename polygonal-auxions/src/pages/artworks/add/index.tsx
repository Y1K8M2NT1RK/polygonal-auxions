import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Fab,
    FormControl,
    InputAdornment,
    InputLabel,
    Avatar,
    OutlinedInput,
    TextField,
    Typography,
    CardHeader,
    CircularProgress,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import stringAvatar from '@/pages/utils/default-avator-icon';
import { useMutation } from "urql";
import { AddArtworkDocument } from "@/pages/generated-graphql";
import { toast } from "react-toastify";

type FormData = {
    title: string;
    feature: string;
};

export default function AddArtwork(){

    {/* フォームの管理 */}
    const {register, handleSubmit, setError, formState: {errors} } = useForm<FormData>({
        defaultValues: {title: '', feature: ''},
        mode: 'onSubmit',
    });

    const router = useRouter();

    {/** 作品の新規追加処理 */}
    const [addArtworkResult, addArtwork] = useMutation(AddArtworkDocument);
    const onSubmit = handleSubmit((data:FormData) => addArtwork(data).then(result => {
        if(result.error){
            const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
            for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
            toast.error('追加できません。入力内容をお確かめください。');
            return;
        }
        toast.success('追加できました。');
        return router.replace('/artworks');
    }));

    const {data: session, status: status} = useSession();
    const auth = session?.user;

    {/** ログインしていないならリダイレクト(CSR) */}
    if(status == 'unauthenticated') router.replace('/artworks');
    if(status == 'loading') return (<CircularProgress key={0} color="inherit" />);

    return (
        status == 'unauthenticated'
        ? null
        : <Container sx={{ mt: 2, mb: 2 }}>
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography variant="h5">作品の追加</Typography>
                    <Box component="form" method="POST" onSubmit={onSubmit}>
                        <CardHeader
                            avatar={<Avatar {...stringAvatar(auth.handle_name, {width: 40, height: 40, fontSize: 20,})} />}
                            title={<Typography variant="subtitle1">{auth.handle_name}</Typography>}
                        />
                        <FormControl fullWidth sx={{mt: 2}}>
                            <TextField 
                                size="small"
                                label="作品名"
                                {...register("title")}
                                error={!!errors?.root?.title?.message}
                                helperText={errors?.root?.title?.message ? errors?.root?.title?.message : null}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <TextField
                                multiline
                                size="small"
                                label="説明文"
                                rows={4}
                                error={!!errors?.root?.feature?.message}
                                helperText={errors?.root?.feature?.message ? errors?.root?.feature?.message : null}
                                {...register("feature")}
                            />
                         </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel htmlFor="outlined-adornment-amount">価格</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">¥</InputAdornment>}
                                // {...register("price")}
                                label="価格"
                            />
                        </FormControl>
                        <Box display='flex' flexDirection='column'>
                            <Fab
                                component={Button}
                                type="submit"
                                color="inherit"
                                variant="extended"
                                sx={{mt: 2, backgroundColor: '#444444'}}
                            >追加</Fab>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}