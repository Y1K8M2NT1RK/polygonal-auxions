import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Box,
} from '@mui/material';

interface CommentSkeletonProps {
    count?: number;
}

export default function CommentSkeleton({ count = 3 }: CommentSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton variant="text" width={80} />}
                        secondary={
                            <Box sx={{ mt: 1 }}>
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="70%" />
                                <Skeleton variant="text" width="40%" sx={{ mt: 0.5 }} />
                            </Box>
                        }
                    />
                </ListItem>
            ))}
        </>
    );
}