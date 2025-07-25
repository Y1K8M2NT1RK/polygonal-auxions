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
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from 'next/link';
import { type User } from '@/generated/generated-graphql';
import { useAuth } from '@/contexts/AuthContexts';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import LoginDialog from './LoginDialog';

type Props = {
    auth: User;
}

export default function AvatorPopover({auth}: Props){

    const { handleLogout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const open = Boolean(anchorEl);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    const [isLockedInputExternally, setIsLockedInputExternally] = useState(false);
    const handleLockInputExternally = () => setIsLockedInputExternally(true);

    return (
        <Box>
            <IconButton sx={{height:'fit-content',}} component={Link} href={`/artworks/add`}>
                <AddIcon sx={{fontSize: 40,}} />
            </IconButton>
            <IconButton sx={{height:'fit-content'}} onClick={handleClick}>
                <DefaultUserIcon
                    name={auth?.handle_name}
                    furtherProp={{ width: 40, height: 40, fontSize: 20,}}
                    imagePath={auth?.user_files[0]?.file_path}
                />
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
                        <MenuItem component={Link} href={`/profile/${auth?.handle_name}`}>
                            <Typography variant="button">
                                <AccountBoxIcon /> プロフィール
                            </Typography>
                        </MenuItem>
                        <MenuItem><Typography variant="button"><SettingsIcon /> 設定</Typography></MenuItem>
                        <LoginDialog
                            button={
                                <MenuItem onClick={() => {
                                    handleDialogOpen();
                                    handleLockInputExternally();
                                    handleLogout();
                                }}>
                                    <Typography variant="button"><LogoutIcon /> ログアウト</Typography>
                                </MenuItem>
                            }
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            isLockedInputExternally={isLockedInputExternally}
                        />
                    </MenuList>
                </Card>
            </Popover>
        </Box>
    );
}