import {
    Box,
    Button,
    Card,
    Typography,
    FormControl,
    TextField,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import type { Comment, Artwork } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { GetArtworkCommentsDocument, UpsertCommentDocument } from "@/generated/generated-graphql";
import { useAuth } from '@/contexts/AuthContexts';
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "urql";
import ArtworkCommentUnit from './artwork-comment-unit';
import { usePause } from '@/contexts/PauseContexts';
import { useEffect, useState } from 'react';

type Props = { artwork: Artwork,}

type FormData = {
    body: string;
    artwork_id: string;
};

export default function ArtworkComments({artwork}: Props){
    const { user, isLoggedIn } = useAuth();
    const { isPaused, setPaused } = usePause();

    const {register, handleSubmit, setError, formState: {errors}, reset } = useForm<FormData>({ mode: 'onSubmit',});

    const [artworkComments, getArtworkComments] = useQuery({
        query: GetArtworkCommentsDocument,
        variables: {artwork_id: artwork?.id},
        requestPolicy: 'network-only',
        pause: isPaused,
    });
    const { fetching, data } = artworkComments;

    const [, upsertComment] = useMutation(UpsertCommentDocument);

    const [deletedCommentsInFront, setDeletedCommentsInFront] = useState<{
        comment_slug_id: string,
        deleted: boolean,
    }[]>([]);

    const comments: (Comment & {deletedInFront: boolean;})[] = data?.getArtworkComments;
    
    const onSubmit = handleSubmit((data:FormData) => upsertComment(data).then(result => {
        setPaused(false);
        if(result.error){
            const gqlErrors:string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
            for( const [key, val] of Object.entries(gqlErrors) ) setError(`root.${key}`, {type: 'server', message: val[0]});
            return;
        }
        getArtworkComments();
        reset({ body: '', artwork_id: artwork.id,});
    }));

    useEffect(() => { 
        if( deletedCommentsInFront.length > 0 ) setPaused(true);
    }, [deletedCommentsInFront, comments, setPaused]);

    return (
        <Card sx={{p: '10px', my: 1}}>
            <Typography variant="h5" sx={{mt: 1, ml: 1}} >コメント</Typography>
            <List>
                {!isLoggedIn
                ? <Typography sx={{textAlign: 'center', my: 3}}>ログインすることでコメントができます。</Typography>
                : <Box component="form" method="POST" onSubmit={onSubmit}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Link href={`/profile/${user?.handle_name}`} passHref>
                                <DefaultUserIcon name={user?.handle_name || ''} furtherProp={{mr: '10px',}} />
                            </Link>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user?.handle_name}
                            secondaryTypographyProps={{ component: 'div' }}
                            secondary={
                                <Box sx={{display: 'flex', alignItems: 'flex-start', mt: '10px'}}>
                                    <FormControl><TextField hidden {...register("artwork_id")} defaultValue={artwork.id} /></FormControl>
                                    <FormControl fullWidth>
                                        <TextField 
                                            multiline
                                            size="small"
                                            placeholder="コメントを入力"
                                            {...register("body")}
                                            error={!!errors?.root?.body?.message}
                                            helperText={errors?.root?.body?.message ? errors?.root?.body?.message : null}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        color="inherit"
                                        sx={{height: 'fit-content', backgroundColor: '#444444', borderRadius: '50px', ml: 1}}
                                    >追加</Button>
                                </Box>
                            }
                        />
                    </ListItem>
                </Box>}
                <Divider sx={{mt: '10px'}} />
                {
                    fetching
                    ? <CircularProgress key={0} color="inherit" />
                    : (
                        comments==undefined || comments.length == 0
                        ? <Typography sx={{textAlign: 'center', my: 3}}>コメントはありません</Typography>
                        : comments.map((comment) => (
                            <ArtworkCommentUnit
                                comment={comment}
                                key={comment.slug_id}
                                deletedCommentsInFront={deletedCommentsInFront}
                                setDeletedCommentsInFront={setDeletedCommentsInFront}
                            />
                        )))
                }
            </List>
        </Card>
    )
}