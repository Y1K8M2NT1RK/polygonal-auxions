import {
    Box,
    Card,
    Typography,
    IconButton,
    Popover,
    MenuList,
    MenuItem,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AnyVariables, useMutation } from 'urql';
import { AddArtworkRankDocument, RemoveArtworkRankDocument, RemoveArtworkDocument, Artwork } from '@/pages/generated-graphql';
import { useAuth } from '@/pages/contexts/AuthContexts';
import RankButton from '@/pages/components/RankButton';
import AlertDialog from '@/pages/components/AlertDialog';

type ArtworkPopoverProps = {
    isBookmarked: boolean;
    isFavorited: boolean;
    isOwner: boolean;
    artwork: Artwork;
};

export default function ArtworkPopover({isBookmarked, isFavorited, isOwner, artwork}: ArtworkPopoverProps){

    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
  
    const open = Boolean(anchorEl);

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);

    const [, RemoveArtwork] = useMutation<AnyVariables>(RemoveArtworkDocument);

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
            <IconButton sx={{height:'fit-content'}} onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'top', horizontal: 'center', }}
            >
                <Card>
                    <MenuList sx={{display: 'flex', flexDirection: 'column', width: 'max-content'}} dense>
                        <MenuItem><Typography variant="button"><FlagIcon /> 報告</Typography></MenuItem>
                        {
                            isOwner
                            ? <MenuItem>
                                <AlertDialog
                                    button={
                                        <Typography variant='button' color="error" onClick={handleDialogOpen}><DeleteForeverIcon /> 削除</Typography>
                                    }
                                    isDialogOpen={openDialog}
                                    content={
                                        <Box>
                                            <Typography>以下の作品を削除してもよろしいですか？</Typography><br />
                                            <Typography>{artwork.title}</Typography><br />
                                            <Typography sx={{ fontWeight: 'bold'}} color="error"><WarningIcon />この操作は取り消せません</Typography>
                                        </Box>
                                    }
                                    onConfirm={() => {RemoveArtwork({artwork_id: String(artwork.id)}); handleDialogClose();}}
                                    onCancel={handleDialogClose}
                                />
                            </MenuItem>
                            : null
                        }
                    </MenuList>
                </Card>
            </Popover>
        </Box>
    );
}