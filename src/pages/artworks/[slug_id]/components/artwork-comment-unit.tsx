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
import { RemoveCommentDocument } from "@/generated/generated-graphql";
import { useAuth } from '@/contexts/AuthContexts';
import { useMutation } from "urql";
import { DateTime } from 'luxon';
import WarningIcon from '@mui/icons-material/Warning';
import AlertDialog from '@/components/AlertDialog';
import { Dispatch, SetStateAction, useState } from 'react';

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

    const [openDialog, setOpenDialog] = useState(false);
    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

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
            {
                (isLoggedIn && user?.handle_name === comment?.user.handle_name)
                ? <AlertDialog
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
                : null
            }
        </ListItem>
    )
}