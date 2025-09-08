import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from 'urql';
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
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Preparing } from '@/components/Preparing';

// GraphQL query for articles
const GET_PUBLISHED_ARTICLES = `
  query GetPublishedArticles($first: Int, $after: String, $tags: [String!], $search: String) {
    publishedArticles(first: $first, after: $after, tags: $tags, search: $search) {
      edges {
        node {
          id
          slugId
          title
          excerpt
          tags
          featuredImage
          publishedAt
          createdAt
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

const GET_ARTICLE_TAGS = `
  query GetArticleTags {
    articleTags
  }
`;

const ArticleCard: React.FC<{ article: any }> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {article.featuredImage && (
        <Box
          component="img"
          src={article.featuredImage}
          alt={article.title}
          sx={{
            height: 200,
            objectFit: 'cover',
            width: '100%',
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {article.title}
        </Typography>
        {article.excerpt && (
          <Typography variant="body2" color="textSecondary" paragraph>
            {article.excerpt}
          </Typography>
        )}
        <Box sx={{ mb: 2 }}>
          {article.tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
        <Typography variant="caption" color="textSecondary">
          {article.author?.name} • {formatDate(article.publishedAt || article.createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          href={`/articles/${article.slugId}`}
          size="small"
          startIcon={<ViewIcon />}
        >
          読む
        </Button>
      </CardActions>
    </Card>
  );
};

const ArticleListPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 12;

  // Fetch articles
  const [{ data: articlesData, fetching: articlesFetching, error: articlesError }] = useQuery({
    query: GET_PUBLISHED_ARTICLES,
    variables: {
      first: articlesPerPage,
      search: searchTerm || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    },
  });

  // Fetch available tags
  const [{ data: tagsData }] = useQuery({
    query: GET_ARTICLE_TAGS,
  });

  const articles = articlesData?.publishedArticles?.edges?.map((edge: any) => edge.node) || [];
  const totalCount = articlesData?.publishedArticles?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const availableTags = tagsData?.articleTags || [];

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
  };

  const handleTagChange = (event: any) => {
    setSelectedTags(event.target.value);
    setPage(1);
  };

  if (articlesFetching && !articlesData) return <Preparing />;

  return (
    <>
      <Head>
        <title>記事一覧 | Polygonal Auxions</title>
        <meta name="description" content="記事一覧ページ" />
      </Head>

      <Header />

      <Box component="main" sx={{ minHeight: '100vh', py: 4 }}>
        <Box maxWidth="lg" sx={{ mx: 'auto', px: 2 }}>
          {/* ページヘッダー */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              記事一覧
            </Typography>
            <Button
              component={Link}
              href="/admin/articles/new"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              記事を書く
            </Button>
          </Box>

          {/* 検索・フィルター */}
          <Card sx={{ mb: 4, p: 3 }}>
            <form onSubmit={handleSearch}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="記事を検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="タイトルや内容で検索..."
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>タグでフィルター</InputLabel>
                    <Select
                      multiple
                      value={selectedTags}
                      onChange={handleTagChange}
                      label="タグでフィルター"
                    >
                      {availableTags.map((tag: string) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ height: 56 }}
                  >
                    検索
                  </Button>
                </Grid>
              </Grid>
            </form>
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

          {/* 記事一覧 */}
          {articles.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {articles.map((article: any) => (
                  <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <ArticleCard article={article} />
                  </Grid>
                ))}
              </Grid>

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
                {totalCount}件の記事が見つかりました
              </Typography>
            </>
          ) : (
            !articlesFetching && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="textSecondary">
                  記事が見つかりませんでした
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  検索条件を変更してお試しください
                </Typography>
              </Box>
            )
          )}

          {/* モバイル用記事作成ボタン */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            <Button
              component={Link}
              href="/admin/articles/new"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '50%',
                minWidth: 56,
                height: 56,
                boxShadow: 3,
              }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default ArticleListPage;