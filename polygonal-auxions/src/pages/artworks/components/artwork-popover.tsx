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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function ArtworkPopover(){

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const open = Boolean(anchorEl);

    return (
        <Box>
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
                        <MenuItem><Typography variant="button"><FavoriteBorderIcon /> お気に入りに追加</Typography></MenuItem>
                        <MenuItem><Typography variant="button"><PersonAddAltIcon /> フォロー</Typography></MenuItem>
                        <MenuItem><Typography variant="button"><FlagIcon /> 報告</Typography></MenuItem>
                    </MenuList>
                </Card>
            </Popover>
        </Box>
    );
}