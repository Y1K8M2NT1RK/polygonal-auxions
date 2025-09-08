import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from 'urql';
import {
  Box,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  Container,
  Alert,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Preparing } from '@/components/Preparing';
import { NotFound } from '@/components/NotFound';

// GraphQL query for single article
const GET_ARTICLE = `
  query GetArticle($slugId: String) {
    article(slugId: $slugId) {
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
        introduction
      }
    }
  }
`;

interface ArticleDetailPageProps {
  slugId: string;
}

const ArticleDetailPage: NextPage<ArticleDetailPageProps> = ({ slugId }) => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_ARTICLE,
    variables: { slugId },
  });

  const article = data?.article;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (fetching) return <Preparing />;
  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Alert severity="error">
            記事の取得に失敗しました: {error.message}
          </Alert>
        </Container>
        <Footer />
      </>
    );
  }
  if (!article) return <NotFound />;

  return (
    <>
      <Head>
        <title>{article.title} | Polygonal Auxions</title>
        <meta name="description" content={article.excerpt || article.title} />
        {article.featuredImage && (
          <meta property="og:image" content={article.featuredImage} />
        )}
      </Head>

      <Header />

      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          {/* 戻るボタン */}
          <Button
            component={Link}
            href="/articles"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            記事一覧に戻る
          </Button>

          {/* 記事ヘッダー */}
          <Box sx={{ mb: 4 }}>
            {/* タイトル */}
            <Typography variant="h3" component="h1" gutterBottom>
              {article.title}
            </Typography>

            {/* メタ情報 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {article.author?.name?.charAt(0) || '?'}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {article.author?.name || '匿名'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    @{article.author?.handleName || 'anonymous'}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {formatDate(article.publishedAt || article.createdAt)}
              </Typography>
              <Button
                component={Link}
                href={`/admin/articles/${article.id}/edit`}
                size="small"
                startIcon={<EditIcon />}
                sx={{ ml: 'auto' }}
              >
                編集
              </Button>
            </Box>

            {/* タグ */}
            {article.tags?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                {article.tags.map((tag: string) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}

            {/* アイキャッチ画像 */}
            {article.featuredImage && (
              <Box
                component="img"
                src={article.featuredImage}
                alt={article.title}
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 3,
                }}
              />
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* 記事本文 */}
          <Box
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 4,
                mb: 2,
                fontWeight: 'bold',
              },
              '& h1': { fontSize: '2rem' },
              '& h2': { fontSize: '1.75rem' },
              '& h3': { fontSize: '1.5rem' },
              '& h4': { fontSize: '1.25rem' },
              '& h5': { fontSize: '1.1rem' },
              '& h6': { fontSize: '1rem' },
              '& p': {
                mb: 2,
                lineHeight: 1.8,
              },
              '& img': {
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 1,
                my: 2,
              },
              '& pre': {
                backgroundColor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
                fontSize: '0.875rem',
              },
              '& code': {
                backgroundColor: '#f5f5f5',
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: '0.875rem',
              },
              '& blockquote': {
                borderLeft: '4px solid #ddd',
                pl: 2,
                py: 1,
                backgroundColor: '#fafafa',
                fontStyle: 'italic',
                my: 2,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 0.5,
              },
              '& a': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <Typography color="textSecondary">
                記事の内容がありません。
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* 著者情報 */}
          {article.author && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                著者について
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ width: 64, height: 64 }}>
                  {article.author.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{article.author.name}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    @{article.author.handleName}
                  </Typography>
                  {article.author.introduction && (
                    <Typography variant="body2">
                      {article.author.introduction}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {/* ナビゲーション */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              href="/articles"
              variant="outlined"
              size="large"
            >
              他の記事を読む
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugId = params?.slug_id as string;

  if (!slugId) {
    return { notFound: true };
  }

  return {
    props: { slugId },
  };
};

export default ArticleDetailPage;