import {
    Box,
    Card,
    Typography,
    IconButton,
    Popover,
    MenuList,
    MenuItem,
} from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import Link from 'next/link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AnyVariables, useMutation } from 'urql';
import { AddArtworkRankDocument, RemoveArtworkRankDocument, RemoveArtworkDocument, Artwork } from '@/generated/generated-graphql';
import { useAuth } from '@/contexts/AuthContexts';
import RankButton from '@/components/RankButton';
import AlertDialog from '@/components/AlertDialog';
import ReportDialog from '@/components/ReportDialog';
import ReportSuccessDialog from '@/components/ReportSuccessDialog';
import { toast } from 'react-toastify';

import {
  useGetReportReasonsQuery,
  useAddArtworkRankMutation,
} from '@/generated/generated-graphql';

type ArtworkPopoverProps = {
    artwork: Artwork & { deletedInFront: boolean };
    setDeletedArtworksInFront?: Dispatch<SetStateAction<{
        artwork_id: number;
        deleted: boolean;
    }[]>>;
};

export default function ArtworkPopover({ artwork, setDeletedArtworksInFront }: ArtworkPopoverProps) {
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    // Report dialog states
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openReportSuccessDialog, setOpenReportSuccessDialog] = useState(false);

    const open = Boolean(anchorEl);

    const isFavorited = !!user ? artwork.isFavoritedByMe : false;
    const isBookmarked = !!user ? artwork.isBookmarkedByMe : false;
    const isOwner = !!user ? artwork.user.handle_name == user.handle_name : false;

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);
    const [, RemoveArtwork] = useMutation<AnyVariables>(RemoveArtworkDocument);

    // Report functionality
    const [reportReasonsResult] = useGetReportReasonsQuery();
    const [, addArtworkRankForReport] = useAddArtworkRankMutation();

    const handleReportDialogOpen = () => {
        if (!user) {
            toast.error('報告するにはログインが必要です');
            return;
        }
        setOpenReportDialog(true);
        handleClose(); // Close the popover when opening report dialog
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

    return (
        <Box>
            <RankButton
                isRanked={isFavorited}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artwork.id), rank_id: '3' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artwork.id), rank_id: '3' })}
                Icon={FavoriteBorderIcon}
                ActiveIcon={FavoriteIcon}
                color="error"
                user={user}
                style={{ height: 'fit-content' }}
            />
            <RankButton
                isRanked={isBookmarked}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artwork.id), rank_id: '4' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artwork.id), rank_id: '4' })}
                Icon={BookmarkBorderIcon}
                ActiveIcon={BookmarkIcon}
                color="primary"
                user={user}
                style={{ height: 'fit-content' }}
            />
            <IconButton sx={{ height: 'fit-content' }} onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Card>
                    <MenuList sx={{ display: 'flex', flexDirection: 'column', width: 'max-content' }} dense>
                        {isOwner ? (
                            <MenuItem>
                                <Typography
                                    variant="button"
                                    component={Link}
                                    href={{
                                        pathname: `/artworks/${artwork?.slug_id}`,
                                        query: { isEditing: true },
                                    }}
                                    passHref
                                >
                                    <EditIcon /> 編集
                                </Typography>
                            </MenuItem>
                        ) : null}
                        <MenuItem>
                            <Typography variant="button" onClick={handleReportDialogOpen}>
                                <FlagIcon /> 報告
                            </Typography>
                        </MenuItem>
                        {isOwner ? (
                            <MenuItem>
                                <AlertDialog
                                    button={
                                        <Typography variant='button' color="error" onClick={handleDialogOpen}>
                                            <DeleteForeverIcon /> 削除
                                        </Typography>
                                    }
                                    isDialogOpen={openDialog}
                                    content={
                                        <Box>
                                            <Typography>以下の作品を削除してもよろしいですか？</Typography>
                                            <br />
                                            <Typography>{artwork.title}</Typography>
                                            <br />
                                            <Typography sx={{ fontWeight: 'bold' }} color="error">
                                                <WarningIcon />この操作は取り消せません
                                            </Typography>
                                        </Box>
                                    }
                                    onConfirm={() => {
                                        RemoveArtwork({ artwork_id: String(artwork.id) });
                                        if (setDeletedArtworksInFront) {
                                            setDeletedArtworksInFront((status) => [
                                                ...status,
                                                {
                                                    artwork_id: parseInt(artwork.id),
                                                    deleted: true,
                                                },
                                            ]);
                                        }
                                        handleDialogClose();
                                    }}
                                    onCancel={handleDialogClose}
                                />
                            </MenuItem>
                        ) : null}
                    </MenuList>
                </Card>
            </Popover>

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
            <ReportSuccessDialog open={openReportSuccessDialog} onClose={handleReportSuccessDialogClose} />
        </Box>
    );
}
