import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery, useMutation } from 'urql';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Publish as PublishIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';

// GraphQL queries and mutations
const GET_ARTICLES = `
  query GetArticles($first: Int, $after: String, $filter: ArticleFilter, $source: String) {
    articles(first: $first, after: $after, filter: $filter, source: $source) {
      edges {
        node {
          id
          slugId
          title
          excerpt
          status
          publishedAt
          tags
          featuredImage
          createdAt
          updatedAt
          microCmsId
          author {
            id
            name
            handleName: handle_name
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const DELETE_ARTICLE = `
  mutation DeleteArticle($id: Int!, $deleteFromMicroCMS: Boolean) {
    deleteArticle(id: $id, deleteFromMicroCMS: $deleteFromMicroCMS)
  }
`;

const PUBLISH_ARTICLE_NOW = `
  mutation PublishArticleNow($id: Int!, $syncToMicroCMS: Boolean) {
    publishArticleNow(id: $id, syncToMicroCMS: $syncToMicroCMS) {
      id
      status
      publishedAt
    }
  }
`;

const SYNC_ARTICLE_FROM_MICROCMS = `
  mutation SyncArticleFromMicroCMS($microCmsId: String!) {
    syncArticleFromMicroCMS(microCmsId: $microCmsId) {
      id
      title
      status
    }
  }
`;

interface DeleteDialogProps {
  open: boolean;
  article: any;
  onClose: () => void;
  onConfirm: (deleteFromMicroCMS: boolean) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, article, onClose, onConfirm }) => {
  const [deleteFromMicroCMS, setDeleteFromMicroCMS] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>記事を削除</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          「{article?.title}」を削除しますか？この操作は元に戻せません。
        </Typography>
        {article?.microCmsId && (
          <FormControlLabel
            control={
              <Switch
                checked={deleteFromMicroCMS}
                onChange={(e) => setDeleteFromMicroCMS(e.target.checked)}
              />
            }
            label="microCMSからも削除する"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          onClick={() => onConfirm(deleteFromMicroCMS)}
          color="error"
          variant="contained"
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminArticleListPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [sourceFilter, setSourceFilter] = useState('both');
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; article: any }>({
    open: false,
    article: null,
  });
  const [syncMicroCmsId, setSyncMicroCmsId] = useState('');
  const articlesPerPage = 20;

  // Fetch articles
  const [{ data: articlesData, fetching: articlesFetching, error: articlesError }, refetchArticles] = useQuery({
    query: GET_ARTICLES,
    variables: {
      first: articlesPerPage,
      filter: {
        search: searchTerm || undefined,
        status: statusFilter.length > 0 ? statusFilter : undefined,
      },
      source: sourceFilter,
    },
  });

  // Mutations
  const [, deleteArticle] = useMutation(DELETE_ARTICLE);
  const [, publishArticleNow] = useMutation(PUBLISH_ARTICLE_NOW);
  const [, syncArticleFromMicroCMS] = useMutation(SYNC_ARTICLE_FROM_MICROCMS);

  const articles = articlesData?.articles?.edges?.map((edge: any) => edge.node) || [];
  const totalCount = articlesData?.articles?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / articlesPerPage);

  const handleDelete = async (article: any) => {
    setDeleteDialog({ open: true, article });
  };

  const handleDeleteConfirm = async (deleteFromMicroCMS: boolean) => {
    if (!deleteDialog.article) return;

    const result = await deleteArticle({
      id: deleteDialog.article.id,
      deleteFromMicroCMS,
    });

    if (result.error) {
      alert('削除に失敗しました: ' + result.error.message);
    } else {
      refetchArticles({ requestPolicy: 'network-only' });
    }

    setDeleteDialog({ open: false, article: null });
  };

  const handlePublishNow = async (article: any) => {
    const result = await publishArticleNow({
      id: article.id,
      syncToMicroCMS: !!article.microCmsId,
    });

    if (result.error) {
      alert('公開に失敗しました: ' + result.error.message);
    } else {
      refetchArticles({ requestPolicy: 'network-only' });
    }
  };

  const handleSyncFromMicroCMS = async () => {
    if (!syncMicroCmsId.trim()) return;

    const result = await syncArticleFromMicroCMS({
      microCmsId: syncMicroCmsId.trim(),
    });

    if (result.error) {
      alert('同期に失敗しました: ' + result.error.message);
    } else {
      setSyncMicroCmsId('');
      refetchArticles({ requestPolicy: 'network-only' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'success';
      case 'DRAFT': return 'warning';
      case 'ARCHIVED': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return '公開';
      case 'DRAFT': return '下書き';
      case 'ARCHIVED': return 'アーカイブ';
      default: return status;
    }
  };

  return (
    <>
      <Head>
        <title>記事管理 | 管理画面</title>
      </Head>

      <Box sx={{ p: 3 }}>
        {/* ページヘッダー */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            記事管理
          </Typography>
          <Button
            component={Link}
            href="/admin/articles/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            新しい記事
          </Button>
        </Box>

        {/* microCMS同期 */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            microCMS同期
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="microCMS記事ID"
              value={syncMicroCmsId}
              onChange={(e) => setSyncMicroCmsId(e.target.value)}
              placeholder="microCMSの記事IDを入力"
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={handleSyncFromMicroCMS}
              disabled={!syncMicroCmsId.trim()}
            >
              同期
            </Button>
          </Box>
        </Card>

        {/* 検索・フィルター */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="記事を検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="タイトルや内容で検索..."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>ステータス</InputLabel>
                <Select
                  multiple
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as string[])}
                  label="ステータス"
                >
                  <MenuItem value="DRAFT">下書き</MenuItem>
                  <MenuItem value="PUBLISHED">公開</MenuItem>
                  <MenuItem value="ARCHIVED">アーカイブ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>データソース</InputLabel>
                <Select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  label="データソース"
                >
                  <MenuItem value="both">すべて</MenuItem>
                  <MenuItem value="local">ローカルのみ</MenuItem>
                  <MenuItem value="microcms">microCMSのみ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        {/* エラー表示 */}
        {articlesError && (
          <Alert severity="error" sx={{ mb: 4 }}>
            記事の取得に失敗しました: {articlesError.message}
          </Alert>
        )}

        {/* ローディング */}
        {articlesFetching && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* 記事一覧テーブル */}
        {articles.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>タイトル</TableCell>
                    <TableCell>ステータス</TableCell>
                    <TableCell>作成者</TableCell>
                    <TableCell>公開日</TableCell>
                    <TableCell>更新日</TableCell>
                    <TableCell>ソース</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article: any) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <Typography variant="subtitle2">{article.title}</Typography>
                        {article.excerpt && (
                          <Typography variant="caption" color="textSecondary">
                            {article.excerpt.slice(0, 100)}...
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(article.status)}
                          size="small"
                          color={getStatusColor(article.status) as any}
                        />
                      </TableCell>
                      <TableCell>{article.author?.name || '未設定'}</TableCell>
                      <TableCell>
                        {article.publishedAt ? formatDate(article.publishedAt) : '-'}
                      </TableCell>
                      <TableCell>{formatDate(article.updatedAt)}</TableCell>
                      <TableCell>
                        <Chip
                          label={article.microCmsId ? 'microCMS' : 'ローカル'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="表示">
                            <IconButton
                              component={Link}
                              href={`/articles/${article.slugId}`}
                              size="small"
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="編集">
                            <IconButton
                              component={Link}
                              href={`/admin/articles/${article.id}/edit`}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {article.status === 'DRAFT' && (
                            <Tooltip title="即時公開">
                              <IconButton
                                onClick={() => handlePublishNow(article)}
                                size="small"
                                color="primary"
                              >
                                <PublishIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="削除">
                            <IconButton
                              onClick={() => handleDelete(article)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ページネーション */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, newPage) => setPage(newPage)}
                  color="primary"
                />
              </Box>
            )}

            {/* 件数表示 */}
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
              {totalCount}件の記事
            </Typography>
          </>
        ) : (
          !articlesFetching && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="textSecondary">
                記事がありません
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                新しい記事を作成してください
              </Typography>
            </Box>
          )
        )}
      </Box>

      {/* 削除確認ダイアログ */}
      <DeleteDialog
        open={deleteDialog.open}
        article={deleteDialog.article}
        onClose={() => setDeleteDialog({ open: false, article: null })}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default AdminArticleListPage;