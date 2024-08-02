import { 
    AppBar, 
    Box, 
    Skeleton, 
    Toolbar,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import LoginDialog from "./LoginDialog";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatorPopover from "./AvatorPopOver";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header (){

    const {data: session, status:status} = useSession();
    const auth = session?.user;

    return (
        <Fragment>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeOnClick
                theme="colored"
                draggable
                transition={Bounce}
            />
            <AppBar color='transparent' sx={{backdropFilter: 'blur(5px)'}}>
                <Toolbar sx={{justifyContent: "space-between",}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        href='/artworks'
                        sx={{
                            flexGrow: 1,
                            display: 'contents',
                        }}
                    >
                        Polygonal Auxions
                    </Typography>
                    {
                        status == 'loading'
                        ?   (
                            <Box sx={{display:'flex'}}>
                                <Skeleton animation="wave" variant="circular" width={56} height={56} />
                                <Skeleton animation="wave" variant="circular" width={56} height={56} />
                            </Box>
                        )
                        :   (
                            !auth
                            ?   <LoginDialog />
                            :   <AvatorPopover auth={auth} />
                        )
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Fragment>
    );
}
