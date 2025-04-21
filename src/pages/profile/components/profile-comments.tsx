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

type Props = {
    user: User
}

export default function ProfileComments({user}: Props){
    return (
        <Card sx={{my: 1, py: '20px', px: '20px'}} elevation={9}>
            <Typography variant="h5" sx={{pb: '10px'}}>コメント</Typography>
            <Grid container sx={{ flexGrow: 1, }} spacing={1}>
                {(!user?.comments)
                ? <CardContent><Typography>投稿したコメントはありません</Typography></CardContent>
                : user.comments.map((comment: Comment, index: number) => (
                    <Grid item key={index} xs={25} md={4} sx={{width: '100%'}}>
                        <Card sx={{p: '10px'}}>
                            <Grid container>
                                <Box sx={{display: 'flex',}}>
                                    <Link href={`/artworks/${comment.artwork.slug_id}`} style={{height: '100px', aspectRatio: '5 / 3'}} passHref>
                                        <CardActionArea sx={{height: '100px',}}>
                                            <CardContent>
                                                <Typography>{comment.artwork.title}</Typography>
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