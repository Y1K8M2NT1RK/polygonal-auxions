import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Fab,
    Grid,
    Typography
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import type { User } from '@/pages/generated-graphql';
import stringAvatar from '@/pages/utils/default-avator-icon';
import { useSession } from 'next-auth/react';

type Props = {
    user: User
}

export default function ProfileHeader({user}: Props){

    const {data: session} = useSession();
    const auth = session?.user;

    return (
        <Card>
            <CardMedia component="img" style={{height:"200px"}} />
            <CardHeader
                avatar={<Avatar {...stringAvatar(user.handle_name, { width: 60, height: 60, fontSize: 30 })} />}
                title={<Typography variant="h5">{user.handle_name}</Typography>}
                subheader={<Typography>{user.introduction}</Typography>}
            />
            <CardContent>
                <Grid container sx={{ flexGrow: 1, }} spacing={2}>
                    {
                        auth?.handle_name == user.handle_name 
                        ?   (<Grid item><Fab color="inherit" variant="extended"><EditIcon />編集</Fab></Grid>)
                        :   (
                            <>
                                <Grid item><Fab color="inherit" variant="extended"><PersonAddAltIcon />フォローする</Fab></Grid>
                                <Grid item><Fab color="inherit" variant="extended"><FlagIcon />報告</Fab></Grid>
                            </>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}