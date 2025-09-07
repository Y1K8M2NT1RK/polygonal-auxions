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
import ProfileEditDialog from '@/components/profile/ProfileEditDialog';
import UserReportDialog from '@/components/UserReportDialog';
import ReportSuccessDialog from '@/components/ReportSuccessDialog';
import { useState, useReducer } from 'react';
import useResponsive from '@/hooks/useResponsive';
import {
  useGetReportReasonsQuery,
  useAddUserRankMutation,
} from '@/generated/generated-graphql';

type Props = {
    viewing_user: User
}

type DialogState = {
    dialog_name: 'profile' | 'follow' | null;
}

export default function ProfileHeader({viewing_user}: Props){
    const { user: auth } = useAuth();
    const {isLargeScreen} = useResponsive();

    const isAuthFollowed = viewing_user?.following.filter((val) => val.followed_by_id == auth?.id)[0] ? true : false;

    const user_images = {
        bg: viewing_user?.user_files.filter((val) => val.purpose_id=='1')[0],
        icon: viewing_user?.user_files.filter((val) => val.purpose_id=='2')[0],
    }

    const [, FollowOrUnfollow] = useMutation(FollowOrUnfollowDocument);

    const [following, reExecuteGetFollowing] = useQuery({query: GetFollowingDocument});
    const [followedBy, reExecuteGetFollowedBy] = useQuery({query: GetFollowedByDocument});

    // User report functionality
    const [reportReasonsResult] = useGetReportReasonsQuery();
    const [, addUserRankForReport] = useAddUserRankMutation();
    
    const [openUserReportDialog, setOpenUserReportDialog] = useState(false);
    const [openReportSuccessDialog, setOpenReportSuccessDialog] = useState(false);

    // const [openDialog, setOpenDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState<DialogState>({dialog_name: null});
    const handleDialogOpen = (dialog_name: DialogState) => setOpenDialog({ ...dialog_name, });
    const handleDialogClose = () => setOpenDialog({ dialog_name: null });

    const handleUserReportDialogOpen = () => {
        if (!auth) {
            toast.error('報告するにはログインが必要です');
            return;
        }
        if (auth.handle_name === viewing_user.handle_name) {
            toast.error('自分のプロフィールは報告できません');
            return;
        }
        setOpenUserReportDialog(true);
    };
    
    const handleUserReportDialogClose = () => setOpenUserReportDialog(false);
    
    const handleReportSuccessDialogClose = () => setOpenReportSuccessDialog(false);
    
    const handleUserReportSubmit = async (rankId: string) => {
        try {
            await addUserRankForReport({
                user_id: String(viewing_user.id),
                rank_id: rankId,
            });
            setOpenUserReportDialog(false);
            setOpenReportSuccessDialog(true);
            toast.success('報告が完了しました');
        } catch (error) {
            console.error('User report submission error:', error);
            toast.error('報告の送信に失敗しました');
            throw error;
        }
    };

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
                setOpenDialog({ dialog_name: 'follow' });
                reExecuteGetFollowing;
                return 'following';
            case 'followedBy':
                setOpenDialog({ dialog_name: 'follow' });
                reExecuteGetFollowedBy;
                return 'followedBy';
            default:
                setOpenDialog({dialog_name: null});
                return target;
        }
    }, 'following');

    return (
        <>
        <Card sx={{ pb: 0 }}>
            <CardMedia component="img" sx={{height:"200px"}} src={user_images?.bg?.file_path || undefined} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: '10px'}}>
                <CardHeader
                    sx={{ pl: '10px', pt: '10px', pb: 0}}
                    avatar={
                        <DefaultUserIcon
                            name={viewing_user?.handle_name}
                            furtherProp={{ width: 60, height: 60, fontSize: 30 }}
                            imagePath={user_images.icon?.file_path}
                        />
                    }
                    title={<Typography variant="h5">{viewing_user?.handle_name}</Typography>}
                    subheader={<Typography>{viewing_user?.introduction}</Typography>}
                />
                {auth?.handle_name == viewing_user?.handle_name ? (
                    <Fab onClick={() => {setOpenDialog({dialog_name: 'profile'})}} size="medium" variant={isLargeScreen ? 'extended' : 'circular'}>
                        <EditIcon />{isLargeScreen ? 'プロフィールを編集' : ''}
                    </Fab>
                ) : (
                    <Fab variant="extended" size="medium" onClick={handleUserReportDialogOpen}>
                        <FlagIcon />報告
                    </Fab>
                )}
            </Box>
            <CardContent sx={{ p: '10px'}}>
                <Grid container sx={{ flexGrow: 1, }} spacing={1}>
                    {
                        auth?.handle_name == viewing_user?.handle_name 
                        ?   (
                            <>
                                <Grid><Fab onClick={() => {dispatch('following');}} variant="extended" size="medium">フォロー中({followingUsers?.length})</Fab></Grid>
                                <Grid><Fab onClick={() => {dispatch('followedBy');}} variant="extended" size="medium">フォロワー({followedByUsers?.length})</Fab></Grid>
                                <ProfileEditDialog
                                    isDialogOpen={openDialog.dialog_name === 'profile'}
                                    onClose={handleDialogClose}
                                    user={viewing_user}
                                    userImages={user_images}
                                />
                                <ListDialog
                                    isDialogOpen={openDialog.dialog_name === 'follow'}
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
                                                                            <DefaultUserIcon
                                                                                name={val?.handle_name}
                                                                                furtherProp={{mr: '10px',}}
                                                                                imagePath={val?.user_files[0]?.file_path}
                                                                            />
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
                                                                            <DefaultUserIcon
                                                                                name={val?.handle_name}
                                                                                furtherProp={{mr: '10px',}}
                                                                                imagePath={val?.user_files[0]?.file_path}
                                                                            />
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
                                <Grid>
                                    {
                                        isAuthFollowed
                                        ?   (
                                            <Fab
                                                variant="extended" component="button" size="medium"
                                                onClick={() => {
                                                    if(!auth) return toast.error('ログインが必要です。');
                                                    FollowOrUnfollow({following_id: viewing_user.id, mode: 'unfollow'})
                                                        .then(() => toast.success(viewing_user.handle_name+'のフォローを解除しました。'))
                                                        .catch(() => toast.error('エラーが発生しました。'))
                                                }}
                                            ><PersonAddDisabledIcon />フォローを解除</Fab>
                                        )
                                        :   (<Fab
                                                variant="extended" component="button" size="medium"
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
                            </>
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
        
        {/* User Report Dialog */}
        <UserReportDialog
            open={openUserReportDialog}
            onClose={handleUserReportDialogClose}
            userId={String(viewing_user.id)}
            userName={viewing_user.handle_name}
            onReportSubmit={handleUserReportSubmit}
            reportReasons={reportReasonsResult.data?.getReportReasons || []}
            loading={reportReasonsResult.fetching}
        />
        
        {/* Report Success Dialog */}
        <ReportSuccessDialog
            open={openReportSuccessDialog}
            onClose={handleReportSuccessDialogClose}
        />
        </>
    )
}
