import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Fab,
    FormControl,
    TextField,
    Typography,
    CardHeader,
    CircularProgress,
    Input,
} from "@mui/material";
import { FormPageSkeleton } from '@/components/skeletons';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import DefaultUserIcon from "@/components/DefaultUserIcon";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useMutation } from "urql";
import { UpsertArtworkDocument } from "@/generated/generated-graphql";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContexts";
import Head from "next/head";
import { useEffect, useState, ChangeEvent } from "react";
import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { BLOB_BASE_DIR } from "@/constants/blob";

type FormData = {
    title: string;
    feature: string;
    image_url: string | null;
    content_type?: string;
};

export default function AddArtwork(){
    const {register, handleSubmit, setError, formState: {errors} } = useForm<FormData>({
        defaultValues: {title: '', feature: '', image_url: null},
        mode: 'onSubmit',
    });

    const router = useRouter();
    const isSmallScreen = useResponsive();

    const [imageUpload, setImageUpload] = useState<File | null>(null);

    const [, upsertArtwork] = useMutation(UpsertArtworkDocument);
    const onSubmit = handleSubmit(async (data:FormData) => {
        if( !!imageUpload ){
            const { url, contentType } = await upload(
                `/${BLOB_BASE_DIR}/artworks/thumbnail/${imageUpload.name}`,
                imageUpload,
                { access: 'public', handleUploadUrl: '/api/upload' }
            );
            data.image_url = url;
            data.content_type = contentType;
        }
        return upsertArtwork(data).then(result => {
            if(result.error){
                const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
                for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
                toast.error('追加できません。入力内容をお確かめください。');
                return;
            }
            toast.success('追加できました。');
            return router.replace('/artworks');
        });
    });

    const {user, fetching, isLoggedIn} = useAuth();

    useEffect(() => { if(isLoggedIn==false && fetching==false) router.push('/artworks'); }, [isLoggedIn, fetching, router]);
    if(fetching) return (<FormPageSkeleton />);

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
                    <Box component="form" onSubmit={onSubmit}>
                        <CardHeader
                            avatar={<DefaultUserIcon name={user.handle_name} furtherProp={{ width: 40, height: 40, fontSize: 20}} />}
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
                        <Box display='flex' flexDirection='column' >
                            {imageUpload && (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Image
                                        width={300}
                                        height={300}
                                        src={URL.createObjectURL(imageUpload)}
                                        alt="Uploaded Artwork"
                                        style={{maxWidth: '100%', maxHeight: '100%', marginTop: '10px'}}
                                    />
                                </Box>
                            )}
                            {
                                imageUpload && (
                                    <Fab
                                        color="error"
                                        variant="extended"
                                        onClick={() => setImageUpload(null)}
                                        sx={{mt: 2, width: '100%'}}
                                    >
                                        <HighlightOffIcon />
                                        サムネイルを削除
                                    </Fab>
                                )
                            }
                            <Fab
                                component="label"
                                color="inherit"
                                variant="extended"
                                sx={{ mt: 2, backgroundColor: '#444444', width: '100%'}}
                            >
                                サムネイルを{!!imageUpload ? '変更' : 'アップロード'}
                                <Input
                                    type="file"
                                    inputProps={{ multiple: false, }}
                                    sx={{ display: 'none' }}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                                        setImageUpload(e.target.files ? e.target.files[0] : null)
                                    }
                                />
                            </Fab>
                         </Box>
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