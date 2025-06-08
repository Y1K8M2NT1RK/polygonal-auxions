import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import Link from 'next/link';
import type { User, Comment } from '@/generated/generated-graphql';
import Image from 'next/image';

type Props = {
    user: User
}

export default function ProfileComments({user}: Props){
    return (
        <Card sx={{my: 1, py: '20px', px: '20px'}} elevation={9}>
            <Typography variant="h5" sx={{pb: '10px'}}>コメント</Typography>
            <Grid container sx={{ flexGrow: 1, }} spacing={1}>
                {user?.comments==undefined || (user?.comments.length == 0)
                ? <CardContent><Typography>投稿したコメントはありません</Typography></CardContent>
                : user.comments.map((comment: Comment, index: number) => (
                    <Grid item key={index} xs={25} md={4} sx={{width: '100%'}}>
                        <Card sx={{p: '10px'}}>
                            <Grid container>
                                <Box sx={{display: 'flex',}}>
                                    <Link href={`/artworks/${comment.artwork.slug_id}`} style={{height: '100px', aspectRatio: '5 / 3'}} passHref>
                                        <CardActionArea sx={{height: '100px',}}>
                                            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                {
                                                    !!(comment.artwork?.artwork_file) && comment.artwork?.artwork_file.length > 0
                                                    ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Image
                                                            fill
                                                            priority
                                                            src={`${comment.artwork.artwork_file[0]?.file_path}`}
                                                            alt={comment.artwork?.title}
                                                            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                                                        />
                                                      </Box>
                                                    : <Typography variant="h5" sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        opacity: 0.3,
                                                    }}>NO IMAGE</Typography>
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardContent sx={{py:0}}>
                                        <Typography sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "3",
                                            WebkitBoxOrient: "vertical",
                                        }}>{comment.body}</Typography>
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