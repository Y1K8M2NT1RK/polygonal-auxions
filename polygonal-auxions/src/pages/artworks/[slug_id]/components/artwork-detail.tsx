import {
    IconButton,
    Card,
    Typography,
    CardActionArea,
    CardHeader,
    Avatar,
    useTheme
} from '@mui/material';
import {
    ArtworkRanks,
    GetArtworkRanksDocument,
    GetAuthArtworkRanksDocument,
    AddArtworkRankDocument,
    RemoveArtworkRankDocument,
    type Artwork,
} from '@/pages/generated-graphql';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import stringAvatar from '@/pages/utils/default-avator-icon';
import { AnyVariables, useQuery, useMutation } from 'urql';
import RankButton from '@/pages/components/RankButton';
import { useAuth } from '@/pages/contexts/AuthContexts';

type Props = {
    artwork: Artwork
}

export default function ArtworkDetail({artwork}: Props){

    const theme = useTheme();
    const { user } = useAuth();

    const [resultArtworkRanks,] = useQuery({query: GetArtworkRanksDocument, variables:{ artwork_id: artwork.id }});
    const [resultAuthArtworkRanks] = useQuery({query: GetAuthArtworkRanksDocument, variables:{ artwork_id: artwork.id }});

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);

    const numOfFavorites = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '3').length;
    const numOfBookmarks = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '4').length;

    const { data: dataAuthArtworkRanks } = resultAuthArtworkRanks;
    let artworkRanks: ArtworkRanks[]|null = null;
    artworkRanks = dataAuthArtworkRanks?.getAuthArtworkRanks as ArtworkRanks[];
    let isFavorited: boolean = false; let isBookmarked: boolean = false;
    if(!!user && !!artworkRanks){
        isFavorited = artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '3' && val.artwork_id == artwork.id && val.user_id == user.id).length > 0;
        isBookmarked = artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '4' && val.artwork_id == artwork.id && val.user_id == user.id).length > 0;
    }

    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
            <Typography>{artwork.feature}</Typography>
            <RankButton
                isRanked={isFavorited}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artwork.id), rank_id: '3' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artwork.id), rank_id: '3' })}
                Icon={FavoriteBorderIcon}
                ActiveIcon={FavoriteIcon}
                color="error"
                user={user}
                style={{mr: '5px',}}
            />{numOfFavorites}
            <RankButton
                isRanked={isBookmarked}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artwork.id), rank_id: '4' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artwork.id), rank_id: '4' })}
                Icon={BookmarkBorderIcon}
                ActiveIcon={BookmarkIcon}
                color="primary"
                user={user}
                style={{ml: '5px', mr: '5px',}}
            />{numOfBookmarks}
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