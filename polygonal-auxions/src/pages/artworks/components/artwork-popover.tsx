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
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AnyVariables, useMutation } from 'urql';
import { AddArtworkRankDocument, RemoveArtworkRankDocument } from '@/pages/generated-graphql';
import { toast } from 'react-toastify';
import { useAuth } from '@/pages/contexts/AuthContexts';

export default function ArtworkPopover(props: {isBookmarked: boolean, isFavorited: boolean, artworkId: Number}){

    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const open = Boolean(anchorEl);

    const [, AddArtworkRank] = useMutation<AnyVariables>(AddArtworkRankDocument);
    const [, RemoveArtworkRank] = useMutation<AnyVariables>(RemoveArtworkRankDocument);

    return (
        <Box>
            {props.isFavorited ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
            {props.isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="primary" />}
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
                        <MenuItem>
                            <Typography variant="button" onClick={() => {
                                if(!user) return toast.error('ログインが必要です。');
                                handleClose();
                                props.isFavorited
                                ?   RemoveArtworkRank({artwork_id: String(props.artworkId), rank_id: '3'}).catch(() => toast.error('エラーが発生しました。'))
                                :   AddArtworkRank({artwork_id: String(props.artworkId), rank_id: '3'}).catch(() => toast.error('エラーが発生しました。'))
                            }}>
                                {props.isFavorited==true ? <FavoriteBorderIcon /> : <FavoriteIcon /> }
                                {props.isFavorited==true ? ' お気に入りから解除' : ' お気に入りに追加'}
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant="button" onClick={() => {
                                if(!user) return toast.error('ログインが必要です。');
                                handleClose();
                                props.isBookmarked
                                ?   RemoveArtworkRank({artwork_id: String(props.artworkId), rank_id: '4'}).catch(() => toast.error('エラーが発生しました。'))
                                :   AddArtworkRank({artwork_id: String(props.artworkId), rank_id: '4'}).catch(() => toast.error('エラーが発生しました。'))
                            }}>
                                {props.isBookmarked==true ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                                {props.isBookmarked==true ? ' ブックマークを解除' : ' ブックマークに追加' }
                            </Typography>
                        </MenuItem>
                        <MenuItem><Typography variant="button"><FlagIcon /> 報告</Typography></MenuItem>
                    </MenuList>
                </Card>
            </Popover>
        </Box>
    );
}