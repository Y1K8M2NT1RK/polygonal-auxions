import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Fab,
    Grid,
    Typography,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Link,
    Box,
    Chip,
    IconButton,
} from '@mui/material';
import {
    FollowOrUnfollowDocument,
    GetFollowingDocument,
    GetFollowedByDocument,
    type User,
} from '@/generated/generated-graphql';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import EditIcon from '@mui/icons-material/Edit';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { useMutation, useQuery } from 'urql';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContexts';
import ListDialog from '@/components/ListDialog';
import { useState, useReducer } from 'react';

type Props = {
    viewing_user: User
}

export default function ProfileHeader({viewing_user}: Props){

    const { user: auth } = useAuth();

    const isAuthFollowed = viewing_user?.following.filter((val) => val.followed_by_id == auth?.id)[0] ? true : false;

    const [, FollowOrUnfollow] = useMutation(FollowOrUnfollowDocument);

    const [following, reExecuteGetFollowing] = useQuery({query: GetFollowingDocument});
    const [followedBy, reExecuteGetFollowedBy] = useQuery({query: GetFollowedByDocument});

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const arrayFollowEachOther = (following: User[], followedBy: User[]) => {
        return following.filter(followingUser =>
            followedBy?.some(followedByUser => followedByUser.handle_name === followingUser.handle_name)
        );
    };
    const followingUsers = following.data?.getFollowingUser;
    const followedByUsers = followedBy.data?.getFollowedByUser;

    const [value, dispatch] = useReducer((target: string, action: string) => {
        switch (action) {
            case 'following':
                setOpenDialog(true);
                reExecuteGetFollowing;
                return 'following';
            case 'followedBy':
                setOpenDialog(true);
                reExecuteGetFollowedBy;
                return 'followedBy';
            default:
                setOpenDialog(false);
                return target;
        }
    }, 'following');

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
                                <Grid item><Fab onClick={() => {handleDialogOpen(); dispatch('following');}} variant="extended">フォロー中({followingUsers?.length})</Fab></Grid>
                                <Grid item><Fab onClick={() => {handleDialogOpen(); dispatch('followedBy');}} variant="extended">フォロワー({followedByUsers?.length})</Fab></Grid>
                                <ListDialog
                                    isDialogOpen={openDialog}
                                    onClose={handleDialogClose}
                                    headerContent={
                                        <>
                                            <Tabs value={value} variant="scrollable" allowScrollButtonsMobile>
                                                <Tab onClick={() => dispatch('following')} label={"フォロー中("+followingUsers?.length+")"} value={'following'} />
                                                <Tab onClick={() => dispatch('followedBy')} label={"フォロワー("+followedByUsers?.length+")"} value={'followedBy'} />
                                                <Tab disabled label="ブロック中" />
                                            </Tabs>
                                            <IconButton aria-label="close" onClick={handleDialogClose} sx={{width: '50px'}} ><CloseIcon /></IconButton>
                                        </>
                                    }
                                    bodyContent={
                                        <Box>
                                            {
                                                value=='following'
                                                ?   <List>
                                                        {
                                                            followingUsers?.length > 0
                                                            ?   followingUsers.map((val: User) => (
                                                                <ListItem key={val.handle_name}>
                                                                    <ListItemAvatar>
                                                                        <Link href={`/profile/${val?.handle_name}`}>
                                                                            <DefaultUserIcon name={val?.handle_name} furtherProp={{mr: '10px',}} />
                                                                        </Link>
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={val?.handle_name}
                                                                        secondary={<Typography>{val?.introduction}</Typography>}
                                                                    />
                                                                    {
                                                                        arrayFollowEachOther(followingUsers, followedByUsers).some(user => user.handle_name === val.handle_name)
                                                                        ?   <Chip label="相互フォロー済" color="success" />
                                                                        :   null
                                                                    }
                                                                </ListItem>
                                                            ))
                                                            :   <ListItem>
                                                                <ListItemText primary="フォロー中のユーザーはいません。" />
                                                            </ListItem>
                                                        }
                                                    </List>
                                                :   null
                                            }
                                            {
                                                value=='followedBy'
                                                ?   <List>
                                                        {
                                                            followedByUsers?.length > 0
                                                            ?   followedByUsers.map((val: User) => (
                                                                <ListItem key={val.handle_name}>
                                                                    <ListItemAvatar>
                                                                        <Link href={`/profile/${val?.handle_name}`}>
                                                                            <DefaultUserIcon name={val?.handle_name} furtherProp={{mr: '10px',}} />
                                                                        </Link>
                                                                    </ListItemAvatar>
                                                                    <ListItemText
                                                                        primary={val?.handle_name}
                                                                        secondary={<Typography>{val?.introduction}</Typography>}
                                                                    />
                                                                    {
                                                                        arrayFollowEachOther(followingUsers, followedByUsers).some(user => user.handle_name === val.handle_name)
                                                                        ?   <Chip label="相互フォロー済" color="success" />
                                                                        :   null
                                                                    }
                                                                </ListItem>
                                                            ))
                                                            :  <ListItem>
                                                                <ListItemText primary="フォロワーはいません。" />
                                                            </ListItem>
                                                        }
                                                    </List>
                                                :   null
                                            }
                                        </Box>
                                    }
                                />
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
                                                        .then(() => toast.success(viewing_user.handle_name+'のフォローを解除しました。'))
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