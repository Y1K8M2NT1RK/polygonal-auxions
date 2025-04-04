import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Fab,
    FormControl,
    Avatar,
    TextField,
    Typography,
    CardHeader,
    CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import stringAvatar from '@/pages/utils/default-avator-icon';
import { useMutation } from "urql";
import { AddArtworkDocument } from "@/pages/generated-graphql";
import { toast } from "react-toastify";
import { useAuth } from "@/pages/contexts/AuthContexts";
import Head from "next/head";
import { useEffect } from "react";
import useResponsive from "@/pages/hooks/useResponsive";

type FormData = {
    title: string;
    feature: string;
};

export default function AddArtwork(){
    const {register, handleSubmit, setError, formState: {errors} } = useForm<FormData>({
        defaultValues: {title: '', feature: ''},
        mode: 'onSubmit',
    });

    const router = useRouter();
    const { isSmallScreen } = useResponsive();

    const [, addArtwork] = useMutation(AddArtworkDocument);
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

    const {user, fetching, isLoggedIn} = useAuth();


    useEffect(() => { if(isLoggedIn==false && fetching==false) router.push('/artworks'); }, [isLoggedIn]);
    if(fetching) return (<CircularProgress key={0} color="inherit" />);

    return (
        !user
        ? null
        : <Container sx={{ mt: 2, mb: 2 }}>
            <Head><title>作品追加</title></Head>
            <Card
                variant="outlined"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CardContent sx={{textAlign: 'center', width: isSmallScreen ? null : '70%'}}>
                    <Typography variant="h5">作品の追加</Typography>
                    <Box component="form" method="POST" onSubmit={onSubmit}>
                        <CardHeader
                            avatar={<Avatar {...stringAvatar(user.handle_name, {width: 40, height: 40, fontSize: 20,})} />}
                            title={<Typography variant="subtitle1">{user.handle_name}</Typography>}
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
                                rows={10}
                                error={!!errors?.root?.feature?.message}
                                helperText={errors?.root?.feature?.message ? errors?.root?.feature?.message : null}
                                {...register("feature")}
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