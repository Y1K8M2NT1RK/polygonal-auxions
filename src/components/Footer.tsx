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

export default function Footer() {

    const { user, isLoggedIn, handleLogout, fetching } = useAuth();

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const handleDrawerOpen = () => setOpenDrawer(true);
    const handleDrawerClose = () => setOpenDrawer(false);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    return (
        <Paper sx={{position: 'fixed', bottom: 0, right: 0, left: 0}} elevation={3}>
            <BottomNavigation>
                {   
                    fetching ? null :
                    <>
                        <BottomNavigationAction showLabel label={'ホーム'} icon={<HomeIcon />} href={'/'} />
                        <BottomNavigationAction showLabel label={'検索'} icon={<SearchIcon />} />
                        {
                            isLoggedIn && user
                            ? (
                                <>
                                    <BottomNavigationAction showLabel label={'作品追加'} href={`/artworks/add`} icon={<AddIcon/>} />
                                    <BottomNavigationAction showLabel label={'マイページ'} onClick={handleDrawerOpen} icon={
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
                                            <ListItemButton href={`/profile/${user.handle_name}`}>
                                                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                                <ListItemText primary={'プロフィール'}/>
                                            </ListItemButton>
                                            <ListItemButton>
                                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                                <ListItemText primary={'設定'}/>
                                            </ListItemButton>
                                            <ListItemButton onClick={() => {
                                                handleLogout();
                                                handleDrawerClose();
                                            }}>
                                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                                <ListItemText primary={'ログアウト'}/>
                                            </ListItemButton>
                                        </List>
                                    </Drawer>
                                </>
                            ) : (
                                <BottomNavigationAction showLabel label={'ログイン'} icon={
                                    <LoginDialog
                                        button={<LoginIcon onClick={handleDialogOpen} />}
                                        openDialog={openDialog}
                                        setOpenDialog={setOpenDialog}
                                    />
                                } />
                            )
                        }
                    </>
                }
            </BottomNavigation>
        </Paper>
    )
}