import {
    Avatar,
    Box,
    Card,
    Typography
} from '@mui/material';
import Link from 'next/link';
import type { Comment, Artwork } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/components/DefaultUserIcon';

type Props = {
    artwork: Artwork
}

export default function ArtworkComments({artwork}: Props){
    return (
        <Card sx={{p: '10px', my: 1}}>
            <div>
                <Typography variant="h5">コメント</Typography>
                <div>
                    {artwork?.comments==undefined || (artwork?.comments.length == 0)
                    ? <Typography>コメントはありません</Typography>
                    : artwork.comments.map((comment: Comment, index: number) => (
                        <Box sx={{display: 'flex', alignItems: 'center', pt: '10px'}} key={index}>
                            <Link href={`/profile/${comment.user.handle_name}`} passHref>
                                <DefaultUserIcon name={comment.user.handle_name} furtherProp={{mr: '10px',}} />
                            </Link>
                            <Typography variant="subtitle2">{comment.body}</Typography>
                        </Box>
                    ))}
                </div>
            </div>
        </Card>
    )
}