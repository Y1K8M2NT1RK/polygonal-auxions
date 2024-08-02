import {
    IconButton,
    Card,
    Typography,
    CardActionArea,
    CardHeader,
    Avatar,
    useTheme
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import type { Artwork } from '@/pages/generated-graphql';
import Link from 'next/link';
import stringAvatar from '@/pages/utils/default-avator-icon';

type Props = {
    artwork: Artwork
}

export default function ArtworkDetail({artwork}: Props){

    const theme = useTheme();

    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
            <Typography>{artwork.feature}</Typography>
            <IconButton sx={{mr: '5px',}}><ThumbUpOffAltIcon /></IconButton>{artwork.likes}
            <IconButton sx={{ml: '5px', mr: '5px',}}><ThumbDownOffAltIcon /></IconButton>{artwork.bads}
            <CardActionArea>
                <Card>
                    <Link href={`/profile/${artwork.user.handle_name}`} passHref>
                        <CardHeader
                            sx={{bgcolor: theme.palette.mode=="dark"?'#333333':'#DDDDDD'}}
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