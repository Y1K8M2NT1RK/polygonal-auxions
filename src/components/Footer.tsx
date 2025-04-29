import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContexts';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import LoginIcon from '@mui/icons-material/Login';
import LoginDialog from './LoginDialog';

export default function Footer() {

    const { user, isLoggedIn } = useAuth();

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    return (
        <Paper sx={{position: 'fixed', bottom: 0, right: 0, left: 0}} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction label={'ホーム'} icon={<HomeIcon />} href={'/'} />
                <BottomNavigationAction label={'検索'} icon={<SearchIcon />} />
                {
                    isLoggedIn && user
                    ? (
                        <>
                            <BottomNavigationAction showLabel label={'作品追加'} href={`/artworks/add`} icon={<AddIcon/>} />
                            <BottomNavigationAction showLabel label={'マイページ'} icon={
                                <DefaultUserIcon name={user.handle_name} furtherProp={{width: 30, height: 30, fontSize: 15}} />
                            } />
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
            </BottomNavigation>
        </Paper>
    )
}