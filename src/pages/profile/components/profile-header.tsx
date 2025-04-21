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
import { FollowOrUnfollowDocument, type User } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/pages/components/DefaultUserIcon';
import { useMutation } from 'urql';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContexts';

type Props = {
    viewing_user: User
}

export default function ProfileHeader({viewing_user}: Props){

    const { user: auth } = useAuth();

    const isAuthFollowed = viewing_user?.following.filter((val) => val.followed_by_id == auth?.id)[0] ? true : false;

    const [, FollowOrUnfollow] = useMutation(FollowOrUnfollowDocument);

    return (
        <Card>
            <CardMedia component="img" style={{height:"200px"}} />
            <CardHeader
                avatar={<DefaultUserIcon name={viewing_user?.handle_name} furtherProp={{ width: 60, height: 60, fontSize: 30 }} />}
                title={<Typography variant="h5">{viewing_user?.handle_name}</Typography>}
                subheader={<Typography>{viewing_user?.introduction}</Typography>}
            />
            <CardContent>
                <Grid container sx={{ flexGrow: 1, }} spacing={2}>
                    {
                        auth?.handle_name == viewing_user?.handle_name 
                        ?   (
                            <>
                                <Grid item><Fab variant="extended"><EditIcon />編集</Fab></Grid>
                                <Grid item><Fab variant="extended">フォロー中</Fab></Grid>
                                <Grid item><Fab variant="extended">フォロワー</Fab></Grid>
                            </>
                        )
                        :   (
                            <>
                                <Grid item>
                                    {
                                        isAuthFollowed
                                        ?   (
                                            <Fab
                                                variant="extended" component="button"
                                                onClick={() => {
                                                    if(!auth) return toast.error('ログインが必要です。');
                                                    FollowOrUnfollow({following_id: viewing_user.id, mode: 'unfollow'})
                                                        .then(() => toast.success(viewing_user.handle_name+'をフォローを解除しました。'))
                                                        .catch(() => toast.error('エラーが発生しました。'))
                                                }}
                                            ><PersonAddDisabledIcon />フォローを解除</Fab>
                                        )
                                        :   (<Fab
                                                variant="extended" component="button"
                                                onClick={() => {
                                                    if(!auth) return toast.error('ログインが必要です。');
                                                    FollowOrUnfollow({following_id: viewing_user.id, mode: 'follow'})   
                                                        .then(() => toast.success(viewing_user.handle_name+'をフォローしました。'))
                                                        .catch(() => toast.error('エラーが発生しました。'))
                                                }}
                                            ><PersonAddAltIcon />フォローする</Fab>
                                        )
                                    }
                                </Grid>
                                <Grid item><Fab variant="extended"><FlagIcon />報告</Fab></Grid>
                            </>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}