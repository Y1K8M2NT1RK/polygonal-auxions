import { 
    AppBar, 
    Box, 
    Button, 
    Skeleton, 
    Toolbar,
    Typography,
    IconButton,
    Badge,
} from "@mui/material";
import { NotificationsNone } from "@mui/icons-material";
import { Fragment, useState } from "react";
import LoginDialog from "./LoginDialog";
import Link from "next/link";
import AvatorPopover from "./AvatorPopOver";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/contexts/AuthContexts';
import SearchInput from "./SearchInput";
import { useNotifications } from '@/hooks/useNotifications';

export default function Header (){
    const { user, fetching, isLoggedIn } = useAuth();
    const { unreadCount } = useNotifications();

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);

    return (
        <Fragment>
            <AppBar color='transparent' sx={{backdropFilter: 'blur(5px)'}}>
                <Toolbar sx={{justifyContent: "space-between",}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        href='/'
                        sx={{
                            flexGrow: 1,
                            display: 'contents',
                        }}
                    >
                        Polygonal Auxions
                    </Typography>
                    <SearchInput inputPaddingSize={'small'} labelFontSize={'1rem'} inputFontSize={'1rem'}/>
                    {
                        fetching
                        ?   (
                            <Box sx={{display:'flex'}}>
                                <Skeleton animation="wave" variant="circular" width={56} height={56} />
                                <Skeleton animation="wave" variant="circular" width={56} height={56} />
                                <Skeleton animation="wave" variant="circular" width={56} height={56} />
                            </Box>
                        ) : isLoggedIn && user ? (
                            <Box sx={{display:'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }}}>
                                <IconButton 
                                    component={Link} 
                                    href="/notifications"
                                    sx={{
                                        height:'fit-content',
                                        p: { xs: 1, sm: 1.5 }
                                    }}
                                    aria-label="通知"
                                >
                                    <Badge badgeContent={unreadCount} color="error">
                                        <NotificationsNone sx={{fontSize: { xs: 32, sm: 40 }}} />
                                    </Badge>
                                </IconButton>
                                <AvatorPopover auth={user} />
                            </Box>
                        ) : (
                            <LoginDialog
                                button={
                                    <Button
                                        onClick={handleDialogOpen}
                                        color="inherit"
                                    >
                                        ログイン
                                    </Button>
                                }
                                openDialog={openDialog}
                                setOpenDialog={setOpenDialog}
                            />
                        )
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Fragment>
    );
}
