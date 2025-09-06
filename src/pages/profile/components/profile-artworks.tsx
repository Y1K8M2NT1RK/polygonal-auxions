import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    IconButton,
    Tooltip
} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import Link from 'next/link';
import type { User, Artwork } from '@/generated/generated-graphql';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { useMutation, useQuery } from 'urql';
import { toast } from 'react-toastify';
import ReportDialog from '@/components/ReportDialog';
import ReportSuccessDialog from '@/components/ReportSuccessDialog';
import { GET_REPORT_REASONS, ADD_ARTWORK_RANK, type ReportReason, type GetReportReasonsQuery, type AddArtworkRankMutation, type AddArtworkRankMutationVariables } from '@/utils/reportGraphql';

type Props = {
    user: User
}

export default function ProfileArtworks({user}: Props){
    const { user: currentUser } = useAuth();
    
    // Report functionality
    const [reportReasonsResult] = useQuery<GetReportReasonsQuery>({ query: GET_REPORT_REASONS });
    const [, addArtworkRankForReport] = useMutation<AddArtworkRankMutation, AddArtworkRankMutationVariables>(ADD_ARTWORK_RANK);
    
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openReportSuccessDialog, setOpenReportSuccessDialog] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    
    const handleReportDialogOpen = (artwork: Artwork) => {
        if (!currentUser) {
            toast.error('報告するにはログインが必要です');
            return;
        }
        if (currentUser.handle_name === artwork.user.handle_name) {
            toast.error('自分の作品は報告できません');
            return;
        }
        setSelectedArtwork(artwork);
        setOpenReportDialog(true);
    };
    
    const handleReportDialogClose = () => {
        setOpenReportDialog(false);
        setSelectedArtwork(null);
    };
    
    const handleReportSuccessDialogClose = () => setOpenReportSuccessDialog(false);
    
    const handleReportSubmit = async (rankId: string) => {
        if (!selectedArtwork) return;
        
        try {
            await addArtworkRankForReport({
                artwork_id: String(selectedArtwork.id),
                rank_id: rankId,
            });
            setOpenReportDialog(false);
            setSelectedArtwork(null);
            setOpenReportSuccessDialog(true);
            toast.success('報告が完了しました');
        } catch (error) {
            console.error('Report submission error:', error);
            toast.error('報告の送信に失敗しました');
            throw error;
        }
    };
    return (
        <Card sx={{my: 1, py: '20px', px: '20px'}} elevation={9}>
            <Typography variant="h5" sx={{pb: '10px'}}>作品</Typography>
            <Grid container sx={{ flexGrow: 1, }} spacing={1}>
                {(!user?.artworks.length)
                ? <CardContent><Typography>作品はありません</Typography></CardContent>
                : user.artworks.map((artwork: Artwork) => (
                    <Grid key={artwork.slug_id} size={{xs: 25, md: 4}} sx={{width: '100%'}}>
                        <Card sx={{p: '10px', position: 'relative'}}>
                            {/* Report button - only show if user is logged in and not viewing their own artwork */}
                            {currentUser && currentUser.handle_name !== artwork.user.handle_name && (
                                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                    <Tooltip title="報告">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleReportDialogOpen(artwork);
                                            }}
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                },
                                            }}
                                        >
                                            <FlagIcon fontSize="small" color="action" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            <Grid container>
                                <Box sx={{display: 'flex',}}>
                                    <Link href={`/artworks/${artwork.slug_id}`} style={{height: '100px', aspectRatio: '5 / 3'}} passHref>
                                        <CardActionArea sx={{
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            height: '100px',
                                        }}>
                                            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                {
                                                    !!(artwork?.artwork_file) && artwork?.artwork_file.length > 0
                                                    ? <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Image
                                                            fill
                                                            priority
                                                            src={`${artwork.artwork_file[0]?.file_path}`}
                                                            alt={artwork?.title}
                                                            style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                                                        />
                                                      </Box>
                                                    : <Typography variant="h5" sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        opacity: 0.3,
                                                    }}>NO IMAGE</Typography>
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardContent sx={{py:0}}>
                                        <Typography variant="subtitle1" sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "1",
                                            WebkitBoxOrient: "vertical",
                                        }}>{artwork.title}</Typography>
                                        <Typography variant="subtitle2">{DateTime.fromISO(artwork.created_at).toFormat('yyyy年MM月dd日')}にアップロード</Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            {/* Report Dialog */}
            {selectedArtwork && (
                <ReportDialog
                    open={openReportDialog}
                    onClose={handleReportDialogClose}
                    artworkId={String(selectedArtwork.id)}
                    artworkTitle={selectedArtwork.title}
                    onReportSubmit={handleReportSubmit}
                    reportReasons={reportReasonsResult.data?.getReportReasons || []}
                    loading={reportReasonsResult.fetching}
                />
            )}
            
            {/* Report Success Dialog */}
            <ReportSuccessDialog
                open={openReportSuccessDialog}
                onClose={handleReportSuccessDialogClose}
            />
        </Card>
    )
}