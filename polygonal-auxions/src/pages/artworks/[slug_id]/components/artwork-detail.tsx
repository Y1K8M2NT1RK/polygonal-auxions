import {
    IconButton,
    Card,
    Typography,
    CardActionArea,
    CardHeader,
    Avatar
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Artwork } from '@/generated/graphql';
import Link from 'next/link';
import stringAvatar from '@/utils/default-avator-icon';

type Props = {
    artwork: Artwork
}

export default function ArtworkDetail({artwork}: Props){
    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
            <Typography>{artwork.feature}</Typography>
            <IconButton sx={{mr: '5px',}}><ThumbUpOffAltIcon /></IconButton>{artwork.likes}
            <IconButton sx={{ml: '5px', mr: '5px',}}><ThumbDownOffAltIcon /></IconButton>{artwork.bads}
            <CardActionArea>
                <Card>
                    <Link href={`/profile/${artwork.user.handle_name}`} passHref>
                        <CardHeader
                            sx={{bgcolor: '#333333'}}
                            avatar={
                                <Avatar {...stringAvatar(artwork.user.handle_name, { width: 40, height: 40, fontSize: 20,})} />
                            }
                            title={
                                <Typography variant="h5">
                                    {artwork.user.handle_name}
                                </Typography>
                            }
                        />
                    </Link>
                </Card>
            </CardActionArea>
        </Card>
    )
}