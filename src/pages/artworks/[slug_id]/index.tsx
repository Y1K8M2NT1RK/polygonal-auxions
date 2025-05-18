import {
    CircularProgress,
    Container,
    Typography,
    FormControl,
    TextField,
    Fab,
    Grid,
    Box
} from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { useState } from 'react';
import type { Artwork } from '@/generated/generated-graphql';
import { toast } from "react-toastify";
import { ArtworkDocument } from '@/generated/generated-graphql';
import ArtworkComments from './components/artwork-comments';
import ArtworkDetail from './components/artwork-detail';
import Head from 'next/head';
import AlertDialog from '@/components/AlertDialog';

export default function Artwork(){
    const slug_id = useRouter().query.slug_id!;
    const [result] = useQuery({query: ArtworkDocument, variables: {slug_id}});
    const { fetching, error, data } = result;

    const [isEditing, setIsEditing] = useState(false);
    const handleIsEditing = () => setIsEditing(true);
    const handleCancelEditing = () => setIsEditing(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    if (fetching) return (<Container><CircularProgress color="inherit" /></Container>);
    if (error) return `Error! ${error.message}`;

    const artwork: Artwork = data?.artwork;

    return (
        <Container sx={{ mt: 2, mb: 2 }}>
            <Head><title>{`作品「${artwork.title}」の詳細`}</title></Head>
            {
                isEditing
                ?  <FormControl fullWidth sx={{mt: 2}}>
                    <TextField 
                        size="meduim"
                        label="作品名"
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        InputProps={{ style: { fontSize: 20 } }}
                        defaultValue={artwork.title}
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
                                defaultValue={artwork?.feature}
                            />
                        </FormControl>
                        <Box sx={{display: 'flex',}}>
                            <Fab color="primary" variant="extended" sx={{mt: 1, mr: 2}}>更新</Fab>
                            <AlertDialog
                                button={<Fab color="white" variant="extended" sx={{mt: 1,}} onClick={handleDialogOpen}>キャンセル</Fab>}
                                isDialogOpen={openDialog}
                                content={<Typography>編集をキャンセルしてもよろしいですか？</Typography>}
                                onConfirm={() => {
                                    handleDialogClose();
                                    handleCancelEditing();
                                    toast.info('編集をキャンセルしました');
                                }}
                                onCancel={handleDialogClose}
                            />
                        </Box>
                    </Grid>
                }
            />
            <ArtworkComments artwork={artwork}/>
        </Container>
    );
}