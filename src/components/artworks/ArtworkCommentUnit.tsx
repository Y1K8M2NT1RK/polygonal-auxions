import {
    Box,
    Button,
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from '@mui/material';
import Link from 'next/link';
import type { Comment } from '@/generated/generated-graphql';
import DefaultUserIcon from '@/components/DefaultUserIcon';
import { RemoveCommentDocument, AddCommentRankDocument, GetReportReasonsDocument } from "@/generated/generated-graphql";
import { useAuth } from '@/contexts/AuthContexts';
import { useQuery, useMutation } from "urql";
import { DateTime } from 'luxon';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import AlertDialog from '@/components/AlertDialog';
import CommentReportDialog from '@/components/CommentReportDialog';
import ReportSuccessDialog from '@/components/ReportSuccessDialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
    comment: Comment & {deletedInFront: boolean;};
    deletedCommentsInFront?: {
        comment_slug_id: string;
        deleted: boolean;
    }[];
    setDeletedCommentsInFront?: Dispatch<SetStateAction<{
        comment_slug_id: string;
        deleted: boolean;
    }[]>>;
};

export default function ArtworkComments({comment, deletedCommentsInFront, setDeletedCommentsInFront}: Props){

    const { user, isLoggedIn } = useAuth();

    const [, RemoveComment] = useMutation(RemoveCommentDocument);
    const [, addCommentRank] = useMutation(AddCommentRankDocument);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    // Report functionality
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openReportSuccessDialog, setOpenReportSuccessDialog] = useState(false);
    
    const [reportReasonsResult] = useQuery({
        query: GetReportReasonsDocument,
        requestPolicy: 'cache-first',
    });

    const handleReportClick = () => {
        if (!isLoggedIn) {
            toast.error('報告するにはログインが必要です');
            return;
        }
        setOpenReportDialog(true);
    };

    const handleReportDialogClose = () => setOpenReportDialog(false);
    const handleReportSuccessDialogClose = () => setOpenReportSuccessDialog(false);

    const handleReportSubmit = async (rankId: string) => {
        try {
            await addCommentRank({
                comment_id: String(comment.id),
                rank_id: rankId,
            });
            setOpenReportDialog(false);
            setOpenReportSuccessDialog(true);
            toast.success('報告が完了しました');
        } catch (error) {
            console.error('Comment report submission error:', error);
            toast.error('報告の送信に失敗しました');
            throw error;
        }
    };

    return (
        !!deletedCommentsInFront?.some(val => val.comment_slug_id == comment.slug_id)
        ? <Box sx={{
                p: '5px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography color="gray">このコメントは削除されました</Typography>
            </Box>
        : <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Link href={`/profile/${comment?.user.handle_name}`} passHref>
                    <DefaultUserIcon
                        name={comment?.user.handle_name}
                        furtherProp={{mr: '10px',}}
                        imagePath={comment?.user.user_files[0]?.file_path}
                    />
                </Link>
            </ListItemAvatar>
            <ListItemText
                primary={comment?.user.handle_name}
                secondary={
                    <>
                        <Typography component="span">{comment?.body}</Typography><br />
                        <Typography component="span">{DateTime.fromISO(comment?.created_at).toFormat('yyyy年MM月dd日 HH:ii')}</Typography>
                    </>
                }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Delete button - only for comment author */}
                {(isLoggedIn && user?.handle_name === comment?.user.handle_name) && (
                    <AlertDialog
                        button={<Button color="error" onClick={handleDialogOpen}>削除</Button>}
                        isDialogOpen={openDialog}
                        content={
                            <Box>
                                <Typography>以下のコメントを削除してもよろしいですか？</Typography><br />
                                <Box sx={{overflow: "auto", maxHeight: '200px', mb: 2}}>
                                    <Typography>{comment.body}</Typography><br />
                                </Box>
                                <Typography sx={{ fontWeight: 'bold'}} color="error"><WarningIcon />この操作は取り消せません</Typography>
                            </Box>
                        }
                        onConfirm={() => {
                            RemoveComment({comment_slug_id: comment.slug_id});
                            if (setDeletedCommentsInFront) {
                                setDeletedCommentsInFront(status => [...status, {
                                    comment_slug_id: comment.slug_id,
                                    deleted: true,
                                }]);
                            }
                            handleDialogClose();
                        }}
                        onCancel={handleDialogClose}
                    />
                )}
                
                {/* Report button - for other users' comments */}
                {(isLoggedIn && user?.handle_name !== comment?.user.handle_name) && (
                    <Button
                        size="small"
                        startIcon={<ReportIcon />}
                        onClick={handleReportClick}
                        sx={{ fontSize: '0.75rem' }}
                    >
                        報告
                    </Button>
                )}
            </Box>
            
            {/* Report Dialog */}
            <CommentReportDialog
                open={openReportDialog}
                onClose={handleReportDialogClose}
                commentId={String(comment.id)}
                commentBody={comment.body}
                onReportSubmit={handleReportSubmit}
                reportReasons={reportReasonsResult.data?.getReportReasons || []}
                loading={reportReasonsResult.fetching}
            />
            
            {/* Report Success Dialog */}
            <ReportSuccessDialog
                open={openReportSuccessDialog}
                onClose={handleReportSuccessDialogClose}
            />
        </ListItem>
    )
}
