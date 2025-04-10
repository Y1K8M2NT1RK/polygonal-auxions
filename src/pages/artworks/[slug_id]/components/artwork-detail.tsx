import {
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
} from '@/generated/generated-graphql';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import stringAvatar from '@/pages/utils/default-avator-icon';
import { AnyVariables, useQuery, useMutation } from 'urql';
import RankButton from '@/pages/components/RankButton';
import { useAuth } from '@/contexts/AuthContexts';
import useDarkMode from '@/pages/hooks/useDarkMode';

type Props = {
    artwork: Artwork
}

export default function ArtworkDetail({artwork}: Props){

    const isDarkMode = useDarkMode();
    const { user } = useAuth();

    const [resultArtworkRanks, reExecuteArtworkRanksQuery] = useQuery({
        query: GetArtworkRanksDocument,
        variables:{ artwork_id: artwork.id },
    });
    const [resultAuthArtworkRanks, reExecuteAuthArtworkRanksQuery] = useQuery({
        query: GetAuthArtworkRanksDocument,
        variables:{ artwork_id: artwork.id },
    });

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

    const handleRankChange = async (artwork_id: string, rank_id: string, action: 'add' | 'remove') => {
        let result;
        result = action === 'add'
            ?   await AddArtworkRank({ artwork_id, rank_id })
            :   await RemoveArtworkRank({ artwork_id, rank_id })
        ;
        reExecuteArtworkRanksQuery({ requestPolicy: 'network-only' });
        reExecuteAuthArtworkRanksQuery({ requestPolicy: 'network-only' });
        return result;
    };

    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
            <Typography>{artwork.feature}</Typography>
            <RankButton
                isRanked={isFavorited}
                onAddRank={() => handleRankChange(String(artwork.id), '3', 'add')}
                onRemoveRank={() => handleRankChange(String(artwork.id), '3', 'remove')}
                Icon={FavoriteBorderIcon}
                ActiveIcon={FavoriteIcon}
                color="error"
                user={user}
                style={{mr: '5px',}}
            />{numOfFavorites}
            <RankButton
                isRanked={isBookmarked}
                onAddRank={() => handleRankChange(String(artwork.id), '4', 'add')}
                onRemoveRank={() => handleRankChange(String(artwork.id), '4', 'remove')}
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
                            sx={{bgcolor: isDarkMode?'#333333':'#DDDDDD'}}
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