import {
    CircularProgress,
    Container,
    Typography,
    FormControl,
    TextField,
    Fab,
    Grid,
    Box,
    Paper,
    Input,
    Button
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
import { useState, type ChangeEvent } from 'react';
import { toast } from "react-toastify";
import ArtworkComments from './components/artwork-comments';
import ArtworkDetail from './components/artwork-detail';
import Head from 'next/head';
import NotFound from '@/components/NotFound';
import Image from 'next/image';
import Link from 'next/link';
import { upload } from "@vercel/blob/client";
import useResponsive from '@/hooks/useResponsive';
import { BLOB_BASE_DIR } from '@/constants/blob';

type FormData = {
    title: string;
    feature: string;
    artwork_slug_id: string;
    current_image_url?: string;
    image_url?: string;
    content_type?: string;
    is_image_deleted?: boolean;
};

export default function Artwork(){
    const slug_id = useRouter().query.slug_id!;

    const {register, handleSubmit, setError, formState: {errors}, reset, watch, setValue } = useForm<FormData>({
        mode: 'onSubmit',
        defaultValues: { is_image_deleted: false }
    });
    
    const [result, reExecuteArtwork] = useQuery({query: ArtworkDocument, variables: {slug_id}, requestPolicy: 'network-only'});
    const [, upsertArtwork] = useMutation(UpsertArtworkDocument);

    const { fetching, error, data } = result;

    const [isEditing, setIsEditing] = useState(useRouter().query.isEditing as unknown as boolean || false);
    const handleIsEditing = () => setIsEditing(true);
    const handleCancelEditing = () => {setIsEditing(false); setImageUpload(null); setValue("is_image_deleted", false);};

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const isImageDeleted = watch('is_image_deleted');

    const {isSmallScreen} = useResponsive();

    if (fetching) return (<Container><CircularProgress color="inherit" /></Container>);
    if (error) return `Error! ${error.message}`;

    const artwork: Artwork = data?.artwork;
    
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
                toast.error('更新できません。入力内容をお確かめください。');
                return;
            }
            handleCancelEditing();
            reExecuteArtwork();
            setValue("current_image_url", data.image_url);
            toast.success('更新しました。');
        });
    });

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
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <FormControl><TextField hidden {...register("current_image_url")} defaultValue={artwork.artwork_file[0]?.file_path} /></FormControl>
                            <FormControl><TextField hidden {...register("is_image_deleted")} /></FormControl>
                            <Box component="label" sx={{position: 'relative', cursor: 'pointer',}}>
                            {
                                !!isEditing
                                ? (
                                    <>
                                        {
                                            isImageDeleted==false && ((!!(artwork?.artwork_file) && artwork?.artwork_file.length > 0) || !!imageUpload)
                                            ? <Image
                                                src={imageUpload ? URL.createObjectURL(imageUpload) : `${artwork.artwork_file[0]?.file_path}`}
                                                alt={artwork?.title}
                                                width={500}
                                                height={500}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'cover',
                                                    opacity: 0.3,
                                                }}
                                                priority
                                            />
                                            : <Paper sx={{ height: '300px', width: `${isSmallScreen==true ? '90vw': '500px'}`, objectFit: 'cover'}}>
                                                <Typography variant="h3" sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '100%',
                                                    opacity: 0.3,
                                                }}>NO IMAGE</Typography>
                                            </ Paper>
                                        }
                                        <Input
                                            type="file"
                                            inputProps={{ multiple: false, }}
                                            sx={{ display: 'none' }}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setValue("is_image_deleted", false);
                                                setImageUpload(e.target.files ? e.target.files[0] : null);
                                            }}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }}>
                                            <Box sx={{width: 'max-content', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                                <Typography>クリックしてサムネイルを変更</Typography>
                                                {
                                                    ((
                                                            isImageDeleted==false
                                                        &&  (!!(artwork?.artwork_file) && artwork?.artwork_file.length > 0)
                                                    )   ||  !!imageUpload
                                                    ) && <Button onClick={(e) => {
                                                        e.preventDefault();
                                                        setValue("is_image_deleted", true);
                                                        setImageUpload(null);
                                                    }}>サムネイルを削除</Button>
                                                }
                                            </Box>
                                        </Box>
                                    </> 
                                )
                                : ( 
                                    !!(artwork?.artwork_file) && artwork?.artwork_file.length > 0
                                    ? <Link
                                        target="_blank"
                                        href={!!isEditing ? '' : `${artwork.artwork_file[0]?.file_path}`}
                                        passHref
                                    >
                                        <Image
                                            src={`${artwork.artwork_file[0]?.file_path}`}
                                            alt={artwork?.title}
                                            width={500}
                                            height={500}
                                            {...(!!isEditing ? {component: "label"} : null)}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'cover',
                                                opacity: 1,
                                            }}
                                            priority
                                        />
                                    </Link>
                                    : <Paper sx={{ height: '300px', width: `${isSmallScreen==true ? '90vw': '500px'}`, objectFit: 'cover'}}>
                                        <Typography variant="h3" sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                            opacity: 0.3,
                                        }}>NO IMAGE</Typography>
                                    </ Paper>
                                )
                            }
                            </ Box>
                        </Box>
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
                            onRefresh={() => reExecuteArtwork({ requestPolicy: 'network-only' })}
                            featureTextareaEl={
                                <Grid>
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
                                        <Fab color="primary" variant="extended" sx={{mt: 1, mr: 1}} type="submit" size='medium'>更新</Fab>
                                        <Fab variant="extended" sx={{mt: 1,}} size='medium' onClick={() => {
                                            handleCancelEditing();
                                            reset({
                                                artwork_slug_id: artwork.slug_id,
                                                is_image_deleted: false,
                                                current_image_url: artwork.artwork_file[0]?.file_path,
                                                title: artwork.title,
                                                feature: artwork.feature,
                                            });
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