import {
    Avatar,
    Card,
    CardContent,
    CardActionArea,
    Grid,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import Link from 'next/link';
import { type ArtworkRanks, type Artwork } from '@/pages/generated-graphql';
import { DateTime } from 'luxon';
import stringAvatar from '@/pages/utils/default-avator-icon';
import ArtworkPopover from './artwork-popover';
import { useAuth } from '@/pages/contexts/AuthContexts';

export default function ArtworkListUnit(props: {artwork: Artwork, artworkRanks: ArtworkRanks[]|null}){

    const { user } = useAuth();

    let isFavorited: boolean = false;
    let isBookmarked: boolean = false;
    let isOwner: boolean = false;

    if(!!user && !!props.artworkRanks){
        isFavorited = props.artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '3' && val.artwork_id == props.artwork.id && val.user_id == user.id).length > 0;
        isBookmarked = props.artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '4' && val.artwork_id == props.artwork.id && val.user_id == user.id).length > 0;
        isOwner = props.artwork.user.handle_name == user.handle_name;
    }

    return (
        <Grid item sx={{width: '100%'}} xs={20} sm={6} md={4}>
            <Paper sx={{p: '10px',}} elevation={9}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link href={`/profile/${props.artwork.user.handle_name}`} style={{display: 'flex', alignItems: 'center'}} passHref>
                        <Avatar {...stringAvatar(props.artwork.user.handle_name, {mr: '10px', mt: '10px', mb: '10px'})} />
                        <Typography>{props.artwork.user.handle_name}</Typography>
                    </Link>
                    <ArtworkPopover isFavorited={isFavorited} isBookmarked={isBookmarked} isOwner={isOwner} artworkId={parseInt(props.artwork.id)} />
                </Box>
                <Card sx={{display: 'flex', flexDirection: 'column',}}>
                    <Link href={`/artworks/${props.artwork.slug_id}`} passHref>
                        <CardActionArea sx={{aspectRatio: '5 / 3'}}>
                            <CardContent>
                                <Typography>{props.artwork.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Card>
                <Typography variant="subtitle1" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{props.artwork.title}</Typography>
                <Typography variant="subtitle2">{DateTime.fromISO(props.artwork.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
            </Paper>
        </Grid>
    )
}