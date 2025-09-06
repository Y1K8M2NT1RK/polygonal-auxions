import {
    Container,
    Box,
    Skeleton,
    Paper,
    Grid,
    Card,
    CardContent,
} from '@mui/material';

export default function ArtworkDetailSkeleton() {
    return (
        <Container sx={{ my: 2 }}>
            {/* 1) 画像エリア（実画面は中央寄せ・高さ約300px） */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ height: 300, width: { xs: '90vw', sm: 500 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
                </Paper>
            </Box>

            {/* 2) タイトル */}
            <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" width="40%" height={40} />
            </Box>

            {/* 3) 詳細カード（ユーザー情報・本文・操作ボタン相当） */}
            <Card sx={{ p: '10px', my: 1 }}>
                {/* 本文（feature）想定 */}
                <Box sx={{ mb: 2 }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="95%" />
                    <Skeleton variant="text" width="60%" />
                </Box>

                {/* アクション行（いいね/ブックマーク等） */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 18 }} />
                    <Skeleton variant="rectangular" width={110} height={36} sx={{ borderRadius: 18 }} />
                </Box>

                {/* ユーザーヘッダー（CardHeader相当） */}
                <Paper>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="text" width={140} />
                    </CardContent>
                </Paper>
            </Card>

            {/* 4) コメントカード（ページ下部に縦並び） */}
            <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
                <Skeleton variant="text" width="25%" height={30} sx={{ mb: 2 }} />
                {Array.from({ length: 3 }).map((_, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width={90} />
                        </Box>
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="70%" />
                    </Box>
                ))}
            </Paper>
        </Container>
    );
}