import {
    Box,
    Card,
    Typography,
    IconButton,
    Popover,
    Avatar,
    MenuList,
    MenuItem,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import stringAvatar from '@/pages/utils/default-avator-icon';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import type { User } from '@/pages/generated-graphql';

type Props = {
    auth: User;
}

export default function AvatorPopover({auth}: Props){

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const open = Boolean(anchorEl);

    return (
        <Box>
            <IconButton sx={{height:'fit-content',}} component={Link} href={`/artworks/add`}>
                <AddIcon sx={{fontSize: 40,}} />
            </IconButton>
            <IconButton sx={{height:'fit-content'}} onClick={handleClick}>
                <Avatar {...stringAvatar(auth.handle_name, { width: 40, height: 40, fontSize: 20,})} />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                transformOrigin={{ vertical: 'top', horizontal: 'center', }}
            >
                <Card>
                    <MenuList sx={{display: 'flex', flexDirection: 'column', width: 'max-content'}}>
                        <MenuItem>
                            <Typography variant="button">
                                <DashboardIcon /> ダッシュボード
                            </Typography>
                        </MenuItem>
                        <MenuItem component={Link} href={`/profile/${auth.handle_name}`}>
                            <Typography variant="button">
                                <AccountBoxIcon /> プロフィール
                            </Typography>
                        </MenuItem>
                        <MenuItem><Typography variant="button"><SettingsIcon /> 設定</Typography></MenuItem>
                        <MenuItem onClick={() => signOut({redirect:false}).then(() => toast.success('ログアウトできました。'))}>
                            <Typography variant="button"><LogoutIcon /> ログアウト</Typography>
                        </MenuItem>
                    </MenuList>
                </Card>
            </Popover>
        </Box>
    );
}