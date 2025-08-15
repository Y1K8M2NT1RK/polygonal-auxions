import {
    BottomNavigation,
    BottomNavigationAction,
    Drawer,
    Paper,
    Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import React, { useReducer, useState } from 'react'
import { useAuth } from '@/contexts/AuthContexts';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginDialog from './LoginDialog';
import Link from 'next/link';
import SearchInput from './SearchInput';

type DrawerState = {
    drawer_name: 'search' | 'user_menu' | null;
}

export default function Footer() {

    const { user, isLoggedIn, handleLogout, fetching } = useAuth();

    const [openDrawer, setOpenDrawer] = useState<DrawerState>({ drawer_name: null });
    const handleDrawerOpen = ({drawer_name}: DrawerState) => setOpenDrawer({ ...{drawer_name} });
    const handleDrawerClose = () => setOpenDrawer({ drawer_name: null });

    const [, dispatch] = useReducer((target: string, action: string) => {
        switch (action) {
            case 'search': setOpenDrawer({ drawer_name: 'search' }); return 'search';
            case 'user_menu': setOpenDrawer({ drawer_name: 'user_menu' }); return 'user_menu';
            default: setOpenDrawer({ drawer_name: null }); return target;
        }
    }, 'search');

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

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
                            <BottomNavigationAction
                                showLabel={true}
                                label={'検索'}
                                onClick={() => dispatch('search')}
                                icon={<SearchIcon />}
                            />
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'作品追加'} href={`/artworks/add`} icon={<AddIcon/>} />
                            <BottomNavigationAction
                                LinkComponent={Link}
                                showLabel={true}
                                label={'マイページ'}
                                onClick={() => dispatch('user_menu')}
                                icon={
                                    <DefaultUserIcon
                                        name={user.handle_name}
                                        furtherProp={{width: 30, height: 30, fontSize: 15}}
                                    />
                                }
                            />
                            <Drawer
                                open={openDrawer.drawer_name === 'user_menu'}
                                anchor={'bottom'}
                                onClose={handleDrawerClose}
                            >
                                <List>
                                    <ListItemButton LinkComponent={Link} href="/">
                                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                                        <ListItemText primary={'ダッシュボード'} onClick={handleDrawerClose} />
                                    </ListItemButton>
                                    <ListItemButton LinkComponent={Link} href={`/profile/${user.handle_name}`}>
                                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                        <ListItemText primary={'プロフィール'} onClick={handleDrawerClose} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                                        <ListItemText primary={'設定'}/>
                                    </ListItemButton>
                                    <ListItemButton onClick={() => { handleLogout(); }}>
                                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                                        <ListItemText primary={'ログアウト'}/>
                                    </ListItemButton>
                                </List>
                            </Drawer>
                        </ BottomNavigation>
                    ) : (
                        <BottomNavigation>
                            <BottomNavigationAction LinkComponent={Link} showLabel={true} label={'ホーム'} icon={<HomeIcon />} href={'/'} />
                            <BottomNavigationAction
                                showLabel={true}
                                label={'検索'}
                                onClick={() => dispatch('search')}
                                icon={<SearchIcon />}
                            />
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
            <Drawer
                open={openDrawer.drawer_name === 'search'}
                anchor={'top'}
                onClose={handleDrawerClose}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5rem',
                }}>
                    <SearchInput
                        inputPaddingSize={'small'}
                        labelFontSize={'1rem'}
                        inputFontSize={'1rem'}
                        onSearchIconClick={handleDrawerClose}
                    />
                </Box>
            </Drawer>
        </Paper>
    )
}