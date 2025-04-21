import { Avatar, BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { useAuth } from '@/contexts/AuthContexts';
import DefaultUserIcon from '@/components/DefaultUserIcon';

export default function Footer() {

    const { user, isLoggedIn } = useAuth();

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation showLabels>
                <BottomNavigationAction label={'検索'} icon={<SearchIcon />} />
                <BottomNavigationAction label={'作品追加'} icon={<AddIcon />} />
                <BottomNavigationAction label={'マイページ'} icon={
                    isLoggedIn && user
                    ? <DefaultUserIcon name={user.handle_name} furtherProp={{width: 30, height: 30, fontSize: 15}} />
                    : <AccountCircleIcon />
                } />
            </BottomNavigation>
        </Paper>
    )
}