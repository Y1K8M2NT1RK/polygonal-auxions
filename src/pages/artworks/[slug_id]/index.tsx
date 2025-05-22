import {
    CircularProgress,
    Container,
    Typography,
    FormControl,
    TextField,
    Fab,
    Grid,
    Box,
} from '@mui/material';
import { 
    UpsertArtworkDocument,
    type Artwork,
    ArtworkDocument,
} from '@/generated/generated-graphql';
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { useState } from 'react';
import { toast } from "react-toastify";
import ArtworkComments from './components/artwork-comments';
import ArtworkDetail from './components/artwork-detail';
import Head from 'next/head';
import NotFound from '@/components/NotFound';

type FormData = {
    title: string;
    feature: string;
    artwork_slug_id: string;
};

export default function Artwork(){
    const slug_id = useRouter().query.slug_id!;

    const {register, handleSubmit, setError, formState: {errors}, reset } = useForm<FormData>({ mode: 'onSubmit',});
    
    const [result, reExecuteArtwork] = useQuery({query: ArtworkDocument, variables: {slug_id}, requestPolicy: 'network-only'});
    const [, upsertArtwork] = useMutation(UpsertArtworkDocument);

    const { fetching, error, data } = result;

    const [isEditing, setIsEditing] = useState(useRouter().query.isEditing as unknown as boolean || false);
    const handleIsEditing = () => setIsEditing(true);
    const handleCancelEditing = () => setIsEditing(false);

    if (fetching) return (<Container><CircularProgress color="inherit" /></Container>);
    if (error) return `Error! ${error.message}`;

    const artwork: Artwork = data?.artwork;
    const onSubmit = handleSubmit((data:FormData) => upsertArtwork(data).then(result => {
        if(result.error){
            const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
            for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
            toast.error('更新できません。入力内容をお確かめください。');
            return;
        }
        reExecuteArtwork();
        toast.success('更新しました。');
        handleCancelEditing();
    }));

    return (
        <Container sx={{ mt: 2, mb: 2 }}>
            {
                artwork.deleted == true
                ? <>
                    <title>見つかりませんでした。</title>
                    <NotFound />
                </>
                : <>
                    <Head><title>{`作品「${artwork.title}」の詳細`}</title></Head>
                    <Box component="form" method="POST" onSubmit={onSubmit}>
                        <FormControl><TextField hidden {...register("artwork_slug_id")} defaultValue={artwork.slug_id} /></FormControl>
                        {
                            isEditing
                            ?  <FormControl fullWidth sx={{mt: 2}}>
                                <TextField 
                                    size="medium"
                                    label="作品名"
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                    InputProps={{ style: { fontSize: 20 } }}
                                    defaultValue={artwork.title}
                                    {...register("title")}
                                    error={!!errors?.root?.title?.message}
                                    helperText={errors?.root?.title?.message ? errors?.root?.title?.message : null}
                                />
                            </FormControl>
                            : <Typography variant="h4">{artwork.title}</Typography>
                        }
                        <ArtworkDetail
                            artwork={artwork}
                            handleIsEditing={handleIsEditing}
                            isEditing={isEditing}
                            featureTextareaEl={
                                <Grid item>
                                    <FormControl fullWidth sx={{mt: 2}}>
                                        <TextField
                                            multiline
                                            size="small"
                                            label="説明文"
                                            rows={10}
                                            defaultValue={artwork.feature}
                                            {...register("feature")}
                                            error={!!errors?.root?.feature?.message}
                                            helperText={errors?.root?.feature?.message ? errors?.root?.feature?.message : null}
                                        />
                                    </FormControl>
                                    <Box sx={{display: 'flex',}}>
                                        <Fab color="primary" variant="extended" sx={{mt: 1, mr: 2}} type="submit">更新</Fab>
                                        <Fab variant="extended" sx={{mt: 1,}} onClick={() => {
                                            handleCancelEditing();
                                            reset({artwork_slug_id: artwork.slug_id, title: artwork.title,  feature: artwork.feature,});
                                            toast.info('編集をキャンセルしました');
                                        }}>キャンセル</Fab>
                                    </Box>
                                </Grid>
                            }
                        />
                    </Box>
                    <ArtworkComments artwork={artwork}/>
                </>
            }
        </Container>
    );
}