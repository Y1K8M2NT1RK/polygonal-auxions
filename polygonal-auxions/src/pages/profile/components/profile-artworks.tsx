import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import Link from 'next/link';
import { User, Artwork } from '@/generated/graphql';
import { DateTime } from 'luxon';

type Props = {
    user: User
}

export default function ProfileArtworks({user}: Props){
    return (
        <Card sx={{my: 1, py: '20px', px: '20px'}} elevation={9}>
            <Typography variant="h5" sx={{pb: '10px'}}>作品</Typography>
            <Grid container sx={{ flexGrow: 1, }} spacing={1}>
                {(!user.artworks.length)
                ? <CardContent><Typography>作品はありません</Typography></CardContent>
                : user.artworks.map((artwork: Artwork, index: number) => (
                    <Grid item key={index} xs={25} md={4} sx={{width: '100%'}}>
                        <Card sx={{p: '10px'}}>
                            <Grid container>
                                <Box sx={{display: 'flex',}}>
                                    <Link href={`/artworks/${artwork.slug_id}`} style={{height: '100px', aspectRatio: '5 / 3'}} passHref>
                                        <CardActionArea sx={{
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            height: '100px',
                                        }}>
                                            <CardContent>
                                                <Typography>{artwork.title}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardContent sx={{py:0}}>
                                        <Typography variant="subtitle1" sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "1",
                                            WebkitBoxOrient: "vertical",
                                        }}>{artwork.title}</Typography>
                                        <Typography variant="subtitle2">{DateTime.fromISO(artwork.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Card>
    )
}