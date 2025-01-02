import {
    IconButton,
    Card,
    Typography,
    CardActionArea,
    CardHeader,
    Avatar,
    useTheme
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ArtworkRanks, GetArtworkRanksDocument, type Artwork } from '@/pages/generated-graphql';
import Link from 'next/link';
import stringAvatar from '@/pages/utils/default-avator-icon';
import { useQuery } from 'urql';

type Props = {
    artwork: Artwork
}

export default function ArtworkDetail({artwork}: Props){

    const theme = useTheme();

    const [resultArtworkRanks,] = useQuery({query: GetArtworkRanksDocument, variables:{ artwork_id: artwork.id }});

    const numOfFavorites = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '3').length;
    const numOfBookmarks = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '4').length;

    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
            <Typography>{artwork.feature}</Typography>
            <IconButton sx={{mr: '5px',}}><FavoriteBorderIcon color='error' /></IconButton>{numOfFavorites}
            <IconButton sx={{ml: '5px', mr: '5px',}}><BookmarkBorderIcon color='primary' /></IconButton>{numOfBookmarks}
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