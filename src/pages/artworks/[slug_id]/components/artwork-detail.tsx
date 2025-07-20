import {
    Card,
    Typography,
    Box,
    CardActionArea,
    CardHeader,
    Grid,
    Fab,
} from '@mui/material';
import {
    ArtworkRanks,
    GetArtworkRanksDocument,
    GetAuthArtworkRanksDocument,
    AddArtworkRankDocument,
    RemoveArtworkRankDocument,
    type Artwork,
} from '@/generated/generated-graphql';
import { useState, ReactElement, ReactNode } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import Link from 'next/link';
import { toast } from "react-toastify";
import { RemoveArtworkDocument } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { AnyVariables, useQuery, useMutation } from 'urql';
import RankButton from '@/components/RankButton';
import AlertDialog from '@/components/AlertDialog';
import { useAuth } from '@/contexts/AuthContexts';
import useDarkMode from '@/hooks/useDarkMode';

type Props = {
    artwork: Artwork,
    handleIsEditing?: (isEditing: boolean) => void,
    isEditing?: boolean,
    featureTextareaEl?: ReactElement,
}

export default function ArtworkDetail({artwork, handleIsEditing, isEditing, featureTextareaEl}: Props){

    const isDarkMode = useDarkMode();
    const { user } = useAuth();

    const [resultArtworkRanks, reExecuteArtworkRanksQuery] = useQuery({
        query: GetArtworkRanksDocument,
        variables:{ artwork_id: artwork?.id },
    });
    const [resultAuthArtworkRanks, reExecuteAuthArtworkRanksQuery] = useQuery({
        query: GetAuthArtworkRanksDocument,
        variables:{ artwork_id: artwork?.id },
    });

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);

    const [, RemoveArtwork] = useMutation<AnyVariables>(RemoveArtworkDocument);

    const numOfFavorites = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '3').length;
    const numOfBookmarks = resultArtworkRanks.data?.getArtworkRanks.filter((val: ArtworkRanks) => val.rank_id == '4').length;
    
    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const { data: dataAuthArtworkRanks } = resultAuthArtworkRanks;

    let artworkRanks: ArtworkRanks[]|null = null;
    artworkRanks = dataAuthArtworkRanks?.getAuthArtworkRanks as ArtworkRanks[];

    let isFavorited: boolean = false;
    let isBookmarked: boolean = false; 
    let isOwner: boolean = false;

    if(!!user && !!artworkRanks){
        isFavorited = artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '3' && val.artwork_id == artwork?.id && val.user_id == user?.id).length > 0;
        isBookmarked = artworkRanks?.filter((val: ArtworkRanks) => val.rank_id == '4' && val.artwork_id == artwork?.id && val.user_id == user?.id).length > 0;
        isOwner = artwork.user.handle_name == user.handle_name;
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
        <Card key={artwork?.slug_id} sx={{p: '10px', my: 1}}>
            {
                isEditing
                ? <>{featureTextareaEl}</>
                : <Typography>{artwork?.feature}</Typography>
            }
            <RankButton
                isRanked={isFavorited}
                onAddRank={() => handleRankChange(String(artwork?.id), '3', 'add')}
                onRemoveRank={() => handleRankChange(String(artwork?.id), '3', 'remove')}
                Icon={FavoriteBorderIcon}
                ActiveIcon={FavoriteIcon}
                color="error"
                user={user}
                style={{mr: '5px',}}
            />{numOfFavorites}
            <RankButton
                isRanked={isBookmarked}
                onAddRank={() => handleRankChange(String(artwork?.id), '4', 'add')}
                onRemoveRank={() => handleRankChange(String(artwork?.id), '4', 'remove')}
                Icon={BookmarkBorderIcon}
                ActiveIcon={BookmarkIcon}
                color="primary"
                user={user}
                style={{ml: '5px', mr: '5px',}}
            />{numOfBookmarks}
            <CardActionArea>
                <Card>
                    <Link href={`/profile/${artwork?.user.handle_name}`} passHref>
                        <CardHeader
                            sx={{bgcolor: isDarkMode?'#333333':'#DDDDDD'}}
                            avatar={
                                <DefaultUserIcon
                                    name={artwork?.user.handle_name}
                                    furtherProp={{ width: 40, height: 40, fontSize: 20, }}
                                    imagePath={artwork?.user.user_files[0]?.file_path}
                                />
                            }
                            title={
                                <Typography variant="h5">
                                    {artwork?.user.handle_name}
                                </Typography>
                            }
                        />
                    </Link>
                </Card>
            </CardActionArea>
            <Grid container sx={{ flexGrow: 1, pt: '10px' }} spacing={2}>
                {
                    isOwner
                    ? <Grid>
                        <Fab
                            variant="extended"
                            onClick={() => handleIsEditing && handleIsEditing(!isEditing)}
                            disabled={!!isEditing}
                        >
                            <EditIcon />{!!isEditing? '編集中...' : '編集'}
                        </Fab>
                    </Grid>
                    : null
                }
                <Grid><Fab variant="extended"><FlagIcon />報告</Fab></Grid>
                {
                    isOwner
                    ? <Grid>
                        <AlertDialog
                            button={<Fab variant="extended" color="error" onClick={handleDialogOpen}><DeleteForeverIcon />削除</Fab>}
                            isDialogOpen={openDialog}
                            content={
                                <Box>
                                    <Typography>以下の作品を削除してもよろしいですか？</Typography><br />
                                    <Typography>{artwork.title}</Typography><br />
                                    <Typography sx={{ fontWeight: 'bold'}} color="error"><WarningIcon />この操作は取り消せません</Typography>
                                </Box>
                            }
                            onConfirm={() => {
                                RemoveArtwork({artwork_id: String(artwork.id)});
                                toast.success('削除しました。');
                            }}
                            onCancel={handleDialogClose}
                        />
                    </Grid>
                    : null
                }
            </Grid>
        </Card>
    )
}