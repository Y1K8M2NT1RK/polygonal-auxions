import React, { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'urql';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Save as SaveIcon, Publish as PublishIcon, Preview as PreviewIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ja } from 'date-fns/locale';
import dynamic from 'next/dynamic';

// Dynamic import for markdown editor (client-side only)
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);

// GraphQL queries and mutations
const GET_ARTICLE = `
  query GetArticle($id: Int) {
    article(id: $id) {
      id
      slugId
      title
      content
      excerpt
      status
      publishedAt
      microCmsId
      tags
      featuredImage
      createdAt
      updatedAt
      author {
        id
        name
        handleName: handle_name
      }
    }
  }
`;

const CREATE_ARTICLE = `
  mutation CreateArticle($input: ArticleInput!, $syncToMicroCMS: Boolean) {
    createArticle(input: $input, syncToMicroCMS: $syncToMicroCMS) {
      id
      slugId
      title
      status
    }
  }
`;

const UPDATE_ARTICLE = `
  mutation UpdateArticle($id: Int!, $input: ArticleInput!, $syncToMicroCMS: Boolean) {
    updateArticle(id: $id, input: $input, syncToMicroCMS: $syncToMicroCMS) {
      id
      slugId
      title
      status
    }
  }
`;

interface ArticleFormPageProps {
  id?: number;
}

const ArticleFormPage: NextPage<ArticleFormPageProps> = ({ id }) => {
  const router = useRouter();
  const isEdit = !!id;

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'>('DRAFT');
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [syncToMicroCMS, setSyncToMicroCMS] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Fetch article data for editing
  const [{ data: articleData, fetching: articleFetching }] = useQuery({
    query: GET_ARTICLE,
    variables: { id },
    pause: !isEdit,
  });

  // Mutations
  const [{ fetching: creating }, createArticle] = useMutation(CREATE_ARTICLE);
  const [{ fetching: updating }, updateArticle] = useMutation(UPDATE_ARTICLE);

  const saving = creating || updating;
  const article = articleData?.article;

  // Load article data for editing
  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setContent(article.content || '');
      setExcerpt(article.excerpt || '');
      setStatus(article.status || 'DRAFT');
      setPublishedAt(article.publishedAt ? new Date(article.publishedAt) : null);
      setTags(article.tags || []);
      setFeaturedImage(article.featuredImage || '');
      setSyncToMicroCMS(!!article.microCmsId);
    }
  }, [article]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    const articleInput = {
      title: title.trim(),
      content: content || undefined,
      excerpt: excerpt.trim() || undefined,
      status: publishNow ? 'PUBLISHED' as const : status,
      publishedAt: publishNow ? new Date() : publishedAt,
      tags: tags.length > 0 ? tags : undefined,
      featuredImage: featuredImage.trim() || undefined,
    };

    try {
      let result;
      if (isEdit) {
        result = await updateArticle({
          id,
          input: articleInput,
          syncToMicroCMS,
        });
      } else {
        result = await createArticle({
          input: articleInput,
          syncToMicroCMS,
        });
      }

      if (result.error) {
        alert('保存に失敗しました: ' + result.error.message);
      } else {
        const savedArticle = result.data?.createArticle || result.data?.updateArticle;
        router.push(`/admin/articles`);
      }
    } catch (error) {
      alert('保存に失敗しました');
      console.error(error);
    }
  };

  if (isEdit && articleFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEdit && !articleFetching && !article) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">記事が見つかりませんでした</Alert>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{isEdit ? '記事編集' : '新規記事'} | 管理画面</title>
      </Head>

      <Box sx={{ p: 3 }}>
        {/* ページヘッダー */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {isEdit ? '記事編集' : '新規記事'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<PreviewIcon />}
              onClick={() => setPreviewOpen(true)}
              disabled={!content}
            >
              プレビュー
            </Button>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => handleSave(false)}
              disabled={saving || !title.trim()}
            >
              {saving ? '保存中...' : '下書き保存'}
            </Button>
            <Button
              variant="contained"
              startIcon={<PublishIcon />}
              onClick={() => handleSave(true)}
              disabled={saving || !title.trim()}
            >
              {saving ? '保存中...' : '公開'}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* メインコンテンツ */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                {/* タイトル */}
                <TextField
                  fullWidth
                  label="タイトル"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  required
                  placeholder="記事のタイトルを入力..."
                />

                {/* 概要 */}
                <TextField
                  fullWidth
                  label="概要"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  margin="normal"
                  multiline
                  rows={2}
                  placeholder="記事の概要を入力..."
                  helperText="検索結果や記事一覧で表示される短い説明文"
                />

                {/* マークダウンエディタ */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    本文 (Markdown)
                  </Typography>
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || '')}
                    preview="edit"
                    height={500}
                    data-color-mode="light"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* サイドバー */}
          <Grid item xs={12} md={4}>
            {/* 公開設定 */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  公開設定
                </Typography>

                <FormControl fullWidth margin="normal">
                  <InputLabel>ステータス</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    label="ステータス"
                  >
                    <MenuItem value="DRAFT">下書き</MenuItem>
                    <MenuItem value="PUBLISHED">公開</MenuItem>
                    <MenuItem value="ARCHIVED">アーカイブ</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                  <DateTimePicker
                    label="公開日時"
                    value={publishedAt}
                    onChange={(newValue) => setPublishedAt(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                        helperText: '指定しない場合は即時公開',
                      },
                    }}
                  />
                </LocalizationProvider>

                <FormControlLabel
                  control={
                    <Switch
                      checked={syncToMicroCMS}
                      onChange={(e) => setSyncToMicroCMS(e.target.checked)}
                    />
                  }
                  label="microCMSと同期"
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>

            {/* タグ */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  タグ
                </Typography>

                <TextField
                  fullWidth
                  label="タグを追加"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  onBlur={handleAddTag}
                  placeholder="タグ名を入力してEnter"
                  margin="normal"
                />

                <Box sx={{ mt: 2 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      sx={{ mr: 1, mb: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* アイキャッチ画像 */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  アイキャッチ画像
                </Typography>

                <TextField
                  fullWidth
                  label="画像URL"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  margin="normal"
                  placeholder="https://example.com/image.jpg"
                />

                {featuredImage && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={featuredImage}
                      alt="アイキャッチ画像プレビュー"
                      style={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* プレビューダイアログ */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{title || '無題'}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 3, mb: 2, fontWeight: 'bold' },
              '& p': { mb: 2, lineHeight: 1.8 },
              '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, my: 2 },
              '& pre': { backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, overflow: 'auto' },
              '& code': { backgroundColor: '#f5f5f5', px: 0.5, py: 0.25, borderRadius: 0.5 },
              '& blockquote': { borderLeft: '4px solid #ddd', pl: 2, py: 1, backgroundColor: '#fafafa' },
            }}
          >
            <MDEditor.Markdown source={content} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  // 'new' の場合は新規作成
  if (id === 'new') {
    return { props: {} };
  }

  // 数値の場合は編集
  const articleId = parseInt(id as string);
  if (!isNaN(articleId)) {
    return { props: { id: articleId } };
  }

  // それ以外は404
  return { notFound: true };
};

export default ArticleFormPage;