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
import { AnyVariables, useMutation, useQuery } from 'urql';
import RankButton from '@/components/RankButton';
import AlertDialog from '@/components/AlertDialog';
import { useAuth } from '@/contexts/AuthContexts';
import useDarkMode from '@/hooks/useDarkMode';
import ReportDialog from '@/components/ReportDialog';
import ReportSuccessDialog from '@/components/ReportSuccessDialog';
import { AddArtworkRankDocument, type AddArtworkRankMutation, type AddArtworkRankMutationVariables } from '@/generated/generated-graphql';
import { gql } from 'urql';

// TODO: Move this to generated types when GraphQL codegen includes it
const GET_REPORT_REASONS = gql`
  query GetReportReasons {
    getReportReasons {
      id
      name
      rank_type_id
    }
  }
`;

type ReportReason = {
  id: string;
  name: string;
  rank_type_id: string;
};

type GetReportReasonsQuery = {
  getReportReasons: ReportReason[];
};

type Props = {
    artwork: Artwork,
    handleIsEditing?: (isEditing: boolean) => void,
    isEditing?: boolean,
    featureTextareaEl?: ReactElement,
    onRefresh?: () => void,
}

export default function ArtworkDetail({artwork, handleIsEditing, isEditing, featureTextareaEl, onRefresh}: Props){
    const isDarkMode = useDarkMode();
    const { user } = useAuth();

    // GraphQL操作は常に初期化（Hooks順序を固定）
    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);
    const [, RemoveArtwork] = useMutation<AnyVariables>(RemoveArtworkDocument);
    
    // Report functionality
    const [reportReasonsResult] = useQuery<GetReportReasonsQuery>({ query: GET_REPORT_REASONS });
    const [, addArtworkRankForReport] = useMutation<AddArtworkRankMutation, AddArtworkRankMutationVariables>(AddArtworkRankDocument);

    const [openDialog, setOpenDialog] = useState(false);
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openReportSuccessDialog, setOpenReportSuccessDialog] = useState(false);
    
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
    
    const handleReportDialogOpen = () => {
        if (!user) {
            toast.error('報告するにはログインが必要です');
            return;
        }
        setOpenReportDialog(true);
    };
    const handleReportDialogClose = () => setOpenReportDialog(false);
    
    const handleReportSuccessDialogClose = () => setOpenReportSuccessDialog(false);

    const handleReportSubmit = async (rankId: string) => {
        try {
            await addArtworkRankForReport({
                artwork_id: String(artwork.id),
                rank_id: rankId,
            });
            setOpenReportDialog(false);
            setOpenReportSuccessDialog(true);
            toast.success('報告が完了しました');
        } catch (error) {
            console.error('Report submission error:', error);
            toast.error('報告の送信に失敗しました');
            throw error;
        }
    };

    const handleRankChange = async (artwork_id: string, rank_id: string, action: 'add' | 'remove') => {
        let result;
        result = action === 'add'
            ?   await AddArtworkRank({ artwork_id, rank_id })
            :   await RemoveArtworkRank({ artwork_id, rank_id })
        ;
        onRefresh?.();
        return result;
    };

    // artworkが未定義なら何も描画しない（Hooksはすでに呼ばれている）
    if (!artwork) return null;

    const numOfFavorites = artwork.favoritesCount;
    const numOfBookmarks = artwork.bookmarksCount;

    const isFavorited = !!user ? artwork.isFavoritedByMe : false;
    const isBookmarked = !!user ? artwork.isBookmarkedByMe : false;
    const isOwner = !!user ? (artwork.user.handle_name == user.handle_name) : false;

    return (
        <Card key={artwork.slug_id} sx={{p: '10px', my: 1}}>
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
                            sx={{bgcolor: isDarkMode?'#333333':'#DDDDDD', p: '10px'}}
                            avatar={
                                <DefaultUserIcon
                                    name={artwork?.user.handle_name}
                                    furtherProp={{ width: 40, height: 40, fontSize: 20, }}
                                    imagePath={artwork?.user.user_files[0]?.file_path}
                                />
                            }
                            title={
                                <Typography variant="h6">{artwork?.user.handle_name}</Typography>
                            }
                        />
                    </Link>
                </Card>
            </CardActionArea>
            <Grid container sx={{ flexGrow: 1, pt: '10px' }} spacing={1}>
                {
                    isOwner
                    ? <Grid>
                        <Fab
                            variant="extended"
                            onClick={() => handleIsEditing && handleIsEditing(!isEditing)}
                            disabled={!!isEditing}
                            size='medium'
                        >
                            <EditIcon />{!!isEditing? '編集中...' : '編集'}
                        </Fab>
                    </Grid>
                    : null
                }
                <Grid>
                    <Fab variant="extended" size='medium' onClick={handleReportDialogOpen}>
                        <FlagIcon />報告
                    </Fab>
                </Grid>
                {
                    isOwner
                    ? <Grid>
                        <AlertDialog
                            button={<Fab variant="extended" color="error" onClick={handleDialogOpen} size='medium'><DeleteForeverIcon />削除</Fab>}
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
            
            {/* Report Dialog */}
            <ReportDialog
                open={openReportDialog}
                onClose={handleReportDialogClose}
                artworkId={String(artwork.id)}
                artworkTitle={artwork.title}
                onReportSubmit={handleReportSubmit}
                reportReasons={reportReasonsResult.data?.getReportReasons || []}
                loading={reportReasonsResult.fetching}
            />
            
            {/* Report Success Dialog */}
            <ReportSuccessDialog
                open={openReportSuccessDialog}
                onClose={handleReportSuccessDialogClose}
            />
        </Card>
    )
}