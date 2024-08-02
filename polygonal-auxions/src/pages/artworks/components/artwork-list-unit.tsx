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
import type { Artwork } from '@/pages/generated-graphql';
import { DateTime } from 'luxon';
import stringAvatar from '@/pages/utils/default-avator-icon';
import ArtworkPopover from './artwork-popover';

type Props = {
    artwork: Artwork
}

export default function ArtworkListUnit({artwork}: Props){
    return (
        <Grid item sx={{width: '100%'}} xs={20} sm={6} md={4}>
            <Paper sx={{p: '10px',}} elevation={9}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link href={`/profile/${artwork.user.handle_name}`} style={{display: 'flex', alignItems: 'center'}} passHref>
                        <Avatar {...stringAvatar(artwork.user.handle_name, {mr: '10px', mt: '10px', mb: '10px'})} />
                        <Typography>{artwork.user.handle_name}</Typography>
                    </Link>
                    <ArtworkPopover />
                </Box>
                <Card sx={{display: 'flex', flexDirection: 'column',}}>
                    <Link href={`/artworks/${artwork.slug_id}`} passHref>
                        <CardActionArea sx={{aspectRatio: '5 / 3'}}>
                            <CardContent>
                                <Typography>{artwork.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Card>
                <Typography variant="subtitle1" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{artwork.title}</Typography>
                <Typography variant="subtitle2">{DateTime.fromISO(artwork.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
            </Paper>
        </Grid>
    )
}