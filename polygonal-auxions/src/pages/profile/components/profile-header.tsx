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
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import { FollowOrUnfollowDocument, type User } from '@/pages/generated-graphql';
import stringAvatar from '@/pages/utils/default-avator-icon';
import { useSession } from 'next-auth/react';
import { useMutation } from 'urql';
import { toast } from 'react-toastify';

type Props = {
    user: User
}

export default function ProfileHeader({user}: Props){

    const {data: session} = useSession();
    const auth = session?.user;

    const isAuthFollowed = user.following.filter((val) => val.followed_by_id == auth.id)[0] ? true : false;

    const [FollowOrUnfollowResult, FollowOrUnfollow] = useMutation(FollowOrUnfollowDocument);

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
                        ?   (
                            <>
                                <Grid item><Fab color="inherit" variant="extended"><EditIcon />編集</Fab></Grid>
                                <Grid item><Fab color="inherit" variant="extended">フォロー中</Fab></Grid>
                                <Grid item><Fab color="inherit" variant="extended">フォロワー</Fab></Grid>
                            </>
                        )
                        :   (
                            <>
                                <Grid item>
                                    {
                                        isAuthFollowed
                                        ?   (
                                            <Fab
                                                color="inherit" variant="extended" component="button"
                                                onClick={() => 
                                                    FollowOrUnfollow({following_id: user.id, mode: 'unfollow'})
                                                        .then(() => toast.success(user.handle_name+'をフォローを解除しました。'))
                                                        .catch(() => toast.error('エラーが発生しました。'))
                                                }
                                            ><PersonAddDisabledIcon />フォローを解除</Fab>
                                        )
                                        :   (<Fab
                                                color="inherit" variant="extended" component="button"
                                                onClick={() => 
                                                    FollowOrUnfollow({following_id: user.id, mode: 'follow'})   
                                                        .then(() => toast.success(user.handle_name+'をフォローしました。'))
                                                        .catch(() => toast.error('エラーが発生しました。'))
                                                }
                                            ><PersonAddAltIcon />フォローする</Fab>
                                        )
                                    }
                                </Grid>
                                <Grid item><Fab color="inherit" variant="extended"><FlagIcon />報告</Fab></Grid>
                            </>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}