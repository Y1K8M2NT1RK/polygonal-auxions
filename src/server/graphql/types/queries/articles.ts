import { builder } from '../../builder';
import { prisma } from '../../../db';
import { Article } from '../consts';
import { 
  getArticlesFromMicroCMS, 
  getArticleFromMicroCMS, 
  MicroCMSArticle 
} from '../../../../lib/microcms';

// ArticleConnection type for pagination
const ArticleConnection = builder.objectType('ArticleConnection', {
  fields: (t) => ({
    edges: t.field({
      type: ['ArticleEdge'],
      resolve: (parent) => parent.edges,
    }),
    pageInfo: t.field({
      type: 'PageInfo',
      resolve: (parent) => parent.pageInfo,
    }),
    totalCount: t.int({
      resolve: (parent) => parent.totalCount,
    }),
  }),
});

const ArticleEdge = builder.objectType('ArticleEdge', {
  fields: (t) => ({
    node: t.field({
      type: 'Article',
      resolve: (parent) => parent.node,
    }),
    cursor: t.string({
      resolve: (parent) => parent.cursor,
    }),
  }),
});

const PageInfo = builder.objectType('PageInfo', {
  fields: (t) => ({
    hasNextPage: t.boolean(),
    hasPreviousPage: t.boolean(),
    startCursor: t.string({ nullable: true }),
    endCursor: t.string({ nullable: true }),
  }),
});

// ArticleFilter input type
const ArticleFilter = builder.inputType('ArticleFilter', {
  fields: (t) => ({
    status: t.stringList({ required: false }),
    authorId: t.int({ required: false }),
    tags: t.stringList({ required: false }),
    search: t.string({ required: false }),
    publishedAfter: t.field({ type: 'DateTime', required: false }),
    publishedBefore: t.field({ type: 'DateTime', required: false }),
  }),
});

// 記事一覧を取得（microCMSとローカルDBの両方から）
builder.queryField('articles', (t) =>
  t.field({
    type: ArticleConnection,
    args: {
      first: t.arg.int({ required: false }),
      after: t.arg.string({ required: false }),
      filter: t.arg({ type: ArticleFilter, required: false }),
      source: t.arg.string({ required: false }), // 'local', 'microcms', 'both'
    },
    resolve: async (_parent, args) => {
      const first = args.first || 10;
      const source = args.source || 'both';
      const filter = args.filter || {};

      let localArticles: any[] = [];
      let microCMSArticles: MicroCMSArticle[] = [];
      let totalCount = 0;

      // ローカルDBから記事を取得
      if (source === 'local' || source === 'both') {
        const whereClause: any = {};

        if (filter.status && filter.status.length > 0) {
          whereClause.status = { in: filter.status };
        }

        if (filter.authorId) {
          whereClause.author_id = filter.authorId;
        }

        if (filter.tags && filter.tags.length > 0) {
          whereClause.tags = {
            hasSome: filter.tags,
          };
        }

        if (filter.search) {
          whereClause.OR = [
            { title: { contains: filter.search, mode: 'insensitive' } },
            { content: { contains: filter.search, mode: 'insensitive' } },
            { excerpt: { contains: filter.search, mode: 'insensitive' } },
          ];
        }

        if (filter.publishedAfter) {
          whereClause.published_at = { gte: filter.publishedAfter };
        }

        if (filter.publishedBefore) {
          whereClause.published_at = { 
            ...whereClause.published_at,
            lte: filter.publishedBefore 
          };
        }

        const offset = args.after ? parseInt(Buffer.from(args.after, 'base64').toString()) : 0;

        localArticles = await prisma.article.findMany({
          where: whereClause,
          include: { author: true },
          orderBy: { created_at: 'desc' },
          skip: offset,
          take: first,
        });

        const localCount = await prisma.article.count({ where: whereClause });
        totalCount += localCount;
      }

      // microCMSから記事を取得
      if (source === 'microcms' || source === 'both') {
        try {
          const offset = args.after ? parseInt(Buffer.from(args.after, 'base64').toString()) : 0;
          
          let microCMSFilter = '';
          if (filter.status && filter.status.length > 0) {
            const statusFilters = filter.status.map(status => `status[equals]${status.toLowerCase()}`).join('[or]');
            microCMSFilter += statusFilters;
          }

          const microCMSResponse = await getArticlesFromMicroCMS(offset, first, microCMSFilter);
          microCMSArticles = microCMSResponse.contents;
          
          if (source === 'microcms') {
            totalCount = microCMSResponse.totalCount;
          } else {
            totalCount += microCMSResponse.totalCount;
          }
        } catch (error) {
          console.error('Failed to fetch from microCMS:', error);
        }
      }

      // 結果を統合
      const allArticles = [
        ...localArticles.map(article => ({
          ...article,
          source: 'local',
        })),
        ...microCMSArticles.map(article => ({
          id: parseInt(article.id) || 0,
          slug_id: article.id,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          status: article.status.toUpperCase(),
          published_at: article.publishedAt ? new Date(article.publishedAt) : null,
          micro_cms_id: article.id,
          tags: article.tags || [],
          featured_image: article.featuredImage?.url,
          created_at: new Date(article.createdAt),
          updated_at: new Date(article.updatedAt),
          author_id: null,
          author: null,
          source: 'microcms',
        })),
      ];

      // 日付順でソート
      allArticles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const edges = allArticles.slice(0, first).map((article, index) => ({
        node: article,
        cursor: Buffer.from((index).toString()).toString('base64'),
      }));

      const hasNextPage = allArticles.length > first;
      const hasPreviousPage = args.after ? true : false;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        },
        totalCount,
      };
    },
  })
);

// 単一記事を取得
builder.queryField('article', (t) =>
  t.field({
    type: 'Article',
    nullable: true,
    args: {
      id: t.arg.int({ required: false }),
      slugId: t.arg.string({ required: false }),
      microCmsId: t.arg.string({ required: false }),
    },
    resolve: async (_parent, args) => {
      // いずれかの識別子が必要
      if (!args.id && !args.slugId && !args.microCmsId) {
        throw new Error('記事のIDまたはslugIdまたはmicroCmsIdが必要です');
      }

      // ローカルDBから検索
      if (args.id || args.slugId) {
        const whereClause = args.id 
          ? { id: args.id }
          : { slug_id: args.slugId };

        const article = await prisma.article.findUnique({
          where: whereClause,
          include: { author: true },
        });

        if (article) {
          return article;
        }
      }

      // microCMSから検索
      if (args.microCmsId) {
        try {
          const microCMSArticle = await getArticleFromMicroCMS(args.microCmsId);
          if (microCMSArticle) {
            return {
              id: parseInt(microCMSArticle.id) || 0,
              slug_id: microCMSArticle.id,
              title: microCMSArticle.title,
              content: microCMSArticle.content,
              excerpt: microCMSArticle.excerpt,
              status: microCMSArticle.status.toUpperCase(),
              published_at: microCMSArticle.publishedAt ? new Date(microCMSArticle.publishedAt) : null,
              micro_cms_id: microCMSArticle.id,
              tags: microCMSArticle.tags || [],
              featured_image: microCMSArticle.featuredImage?.url,
              created_at: new Date(microCMSArticle.createdAt),
              updated_at: new Date(microCMSArticle.updatedAt),
              author_id: null,
              author: null,
            };
          }
        } catch (error) {
          console.error('Failed to fetch from microCMS:', error);
        }
      }

      return null;
    },
  })
);

// 公開記事一覧（フロントエンド用）
builder.queryField('publishedArticles', (t) =>
  t.field({
    type: ArticleConnection,
    args: {
      first: t.arg.int({ required: false }),
      after: t.arg.string({ required: false }),
      tags: t.arg.stringList({ required: false }),
      search: t.arg.string({ required: false }),
    },
    resolve: async (_parent, args) => {
      const first = args.first || 10;
      const offset = args.after ? parseInt(Buffer.from(args.after, 'base64').toString()) : 0;

      const whereClause: any = {
        status: 'PUBLISHED',
        published_at: { lte: new Date() }, // 公開日時が現在時刻以前
      };

      if (args.tags && args.tags.length > 0) {
        whereClause.tags = { hasSome: args.tags };
      }

      if (args.search) {
        whereClause.OR = [
          { title: { contains: args.search, mode: 'insensitive' } },
          { content: { contains: args.search, mode: 'insensitive' } },
          { excerpt: { contains: args.search, mode: 'insensitive' } },
        ];
      }

      const articles = await prisma.article.findMany({
        where: whereClause,
        include: { author: true },
        orderBy: { published_at: 'desc' },
        skip: offset,
        take: first,
      });

      const totalCount = await prisma.article.count({ where: whereClause });

      const edges = articles.map((article, index) => ({
        node: article,
        cursor: Buffer.from((offset + index).toString()).toString('base64'),
      }));

      const hasNextPage = offset + first < totalCount;
      const hasPreviousPage = offset > 0;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        },
        totalCount,
      };
    },
  })
);

// 記事のタグ一覧を取得
builder.queryField('articleTags', (t) =>
  t.stringList({
    resolve: async () => {
      // ローカルDBから全記事のタグを取得
      const articles = await prisma.article.findMany({
        select: { tags: true },
      });

      // 全タグを収集して重複を除去
      const allTags = new Set<string>();
      articles.forEach(article => {
        article.tags.forEach(tag => allTags.add(tag));
      });

      return Array.from(allTags).sort();
    },
  })
);