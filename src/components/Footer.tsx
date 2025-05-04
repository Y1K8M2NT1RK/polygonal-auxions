import { BottomNavigation, BottomNavigationAction, Drawer, Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContexts';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginDialog from './LoginDialog';
import Link from 'next/link';

export default function Footer() {

    const { user, isLoggedIn, handleLogout, fetching } = useAuth();

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const handleDrawerOpen = () => setOpenDrawer(true);
    const handleDrawerClose = () => setOpenDrawer(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    const [isLockedInputExternally, setIsLockedInputExternally] = useState(false);
    const handleLockInputExternally = () => setIsLockedInputExternally(true);

    return (
        <Paper sx={{position: 'fixed', bottom: 0, right: 0, left: 0}} elevation={3}>
            {   
                fetching
                ? <BottomNavigation />
                : (
                    isLoggedIn && user
                    ? (
                        <BottomNavigation>
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'ホーム'} icon={<HomeIcon />} href={'/'} />
                            <BottomNavigationAction showLabel={true} label={'検索'} icon={<SearchIcon />} />
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'作品追加'} href={`/artworks/add`} icon={<AddIcon/>} />
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'マイページ'} onClick={handleDrawerOpen} icon={
                                <DefaultUserIcon
                                    name={user.handle_name}
                                    furtherProp={{width: 30, height: 30, fontSize: 15}}
                                />
                            } />
                            <Drawer
                                open={openDrawer}
                                anchor={'bottom'}
                                onClose={handleDrawerClose}
                            >
                                <List>
                                    <ListItemButton>
                                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                                        <ListItemText primary={'ダッシュボード'}/>
                                    </ListItemButton>
                                    <ListItemButton LinkComponent={Link} href={`/profile/${user.handle_name}`}>
                                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                        <ListItemText primary={'プロフィール'}/>
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                                        <ListItemText primary={'設定'}/>
                                    </ListItemButton>
                                    <LoginDialog
                                        button={
                                            <ListItemButton onClick={() => {
                                                handleDialogOpen();
                                                handleLockInputExternally();
                                                handleLogout();
                                            }}>
                                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                                <ListItemText primary={'ログアウト'}/>
                                            </ListItemButton>
                                        }
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                        isLockedInputExternally={isLockedInputExternally}
                                    />
                                </List>
                            </Drawer>
                        </ BottomNavigation>
                    ) : (
                        <BottomNavigation>
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'ホーム'} icon={<HomeIcon />} href={'/'} />
                            <BottomNavigationAction showLabel={true} label={'検索'} icon={<SearchIcon />} />
                            <BottomNavigationAction showLabel={true} label={'ログイン'} icon={
                                <LoginDialog
                                    button={<LoginIcon onClick={handleDialogOpen} />}
                                    openDialog={openDialog}
                                    setOpenDialog={setOpenDialog}
                                />
                            } />
                        </BottomNavigation>
                    )
                )
            }
        </Paper>
    )
}