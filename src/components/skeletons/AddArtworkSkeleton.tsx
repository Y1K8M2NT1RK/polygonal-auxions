import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Box,
  Skeleton,
} from '@mui/material';

export default function AddArtworkSkeleton() {
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ textAlign: 'center', width: { xs: '100%', md: '70%' } }}>
          {/* タイトル */}
          <Skeleton variant="text" width={160} height={32} sx={{ mx: 'auto', mb: 2 }} />

          {/* フォームヘッダー（ユーザーアイコン+ハンドル名） */}
          <CardHeader
            avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton variant="text" width={120} height={24} />}
          />

          {/* 入力フィールド（作品名／説明） */}
          <Box>
            <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2, borderRadius: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={160} sx={{ mb: 2, borderRadius: 1 }} />
          </Box>

          {/* サムネイル操作ボタン（アップロード） */}
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 22, mb: 2 }} />

          {/* 送信ボタン */}
          <Skeleton variant="rectangular" width="100%" height={44} sx={{ borderRadius: 22 }} />
        </CardContent>
      </Card>
    </Container>
  );
}
