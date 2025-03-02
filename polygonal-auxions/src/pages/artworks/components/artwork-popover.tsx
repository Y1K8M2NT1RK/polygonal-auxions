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
import { AnyVariables, useMutation } from 'urql';
import { AddArtworkRankDocument, RemoveArtworkRankDocument } from '@/pages/generated-graphql';
import { useAuth } from '@/pages/contexts/AuthContexts';
import RankButton from '@/pages/components/RankButton';
import AlertDialog from '@/pages/components/DeleteAlertDialog';

type ArtworkPopoverProps = {
    isBookmarked: boolean;
    isFavorited: boolean;
    isOwner: boolean;
    artworkId: Number;
};

export default function ArtworkPopover({isBookmarked, isFavorited, isOwner, artworkId}: ArtworkPopoverProps){

    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const open = Boolean(anchorEl);

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);

    return (
        <Box>
            <RankButton
                isRanked={isFavorited}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artworkId), rank_id: '3' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artworkId), rank_id: '3' })}
                Icon={FavoriteBorderIcon}
                ActiveIcon={FavoriteIcon}
                color="error"
                user={user}
                style={{ height: 'fit-content' }}
            />
            <RankButton
                isRanked={isBookmarked}
                onAddRank={() => AddArtworkRank({ artwork_id: String(artworkId), rank_id: '4' })}
                onRemoveRank={() => RemoveArtworkRank({ artwork_id: String(artworkId), rank_id: '4' })}
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
                                    content={
                                        <Box>
                                            <Typography>以下の作品を削除してもよろしいですか？</Typography>
                                            <Typography>作品名</Typography>
                                        </Box>
                                    }
                                    onConfirm={() => {console.log('削除が確認されました'); handleClose();}}
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