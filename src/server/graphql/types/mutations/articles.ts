import { builder } from '../../builder';
import { prisma } from '../../../db';
import { ZodError } from 'zod';
import { CsrfError } from '../errors';
import { Article, ArticleInput, ArticleStatus } from '../consts';
import { 
  getArticlesFromMicroCMS, 
  getArticleFromMicroCMS, 
  createArticleInMicroCMS, 
  updateArticleInMicroCMS, 
  deleteArticleFromMicroCMS,
  MicroCMSArticle
} from '../../../../lib/microcms';

// microCMSから記事を取得してローカルDBに同期
builder.mutationField('syncArticleFromMicroCMS', (t) =>
  t.prismaField({
    type: Article,
    errors: { types: [ZodError, CsrfError] },
    authScopes: { isAuthenticated: true },
    args: {
      microCmsId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();

      // microCMSから記事データを取得
      const microCMSArticle = await getArticleFromMicroCMS(args.microCmsId);
      if (!microCMSArticle) {
        throw new Error('記事が見つかりませんでした');
      }

      // ローカルDBの既存記事をチェック
      const existingArticle = await prisma.article.findUnique({
        where: { micro_cms_id: args.microCmsId },
      });

      const articleData = {
        title: microCMSArticle.title,
        content: microCMSArticle.content,
        excerpt: microCMSArticle.excerpt,
        status: microCMSArticle.status.toUpperCase() as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        published_at: microCMSArticle.publishedAt ? new Date(microCMSArticle.publishedAt) : null,
        tags: microCMSArticle.tags || [],
        featured_image: microCMSArticle.featuredImage?.url,
        author_id: ctx.auth?.id,
        micro_cms_id: args.microCmsId,
      };

      if (existingArticle) {
        // 既存記事を更新
        return await prisma.article.update({
          ...query,
          where: { id: existingArticle.id },
          data: articleData,
        });
      } else {
        // 新規記事を作成
        return await prisma.article.create({
          ...query,
          data: articleData,
        });
      }
    },
  })
);

// 記事を作成（ローカルのみまたはmicroCMSと連携）
builder.mutationField('createArticle', (t) =>
  t.prismaField({
    type: Article,
    errors: { types: [ZodError, CsrfError] },
    authScopes: { isAuthenticated: true },
    args: {
      input: t.arg({ type: ArticleInput, required: true }),
      syncToMicroCMS: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();

      let microCmsId: string | null = null;

      // microCMSに同期する場合
      if (args.syncToMicroCMS) {
        const microCMSResult = await createArticleInMicroCMS({
          title: args.input.title,
          content: args.input.content || '',
          excerpt: args.input.excerpt,
          status: args.input.status?.toLowerCase() as 'draft' | 'published' | 'archived' || 'draft',
          tags: args.input.tags || [],
          featuredImage: args.input.featuredImage ? { url: args.input.featuredImage, height: 0, width: 0 } : undefined,
        });

        if (microCMSResult) {
          microCmsId = microCMSResult.id;
        }
      }

      // ローカルDBに記事を作成
      const articleData = {
        title: args.input.title,
        content: args.input.content,
        excerpt: args.input.excerpt,
        status: args.input.status || 'DRAFT',
        published_at: args.input.publishedAt || (args.input.status === 'PUBLISHED' ? new Date() : null),
        tags: args.input.tags || [],
        featured_image: args.input.featuredImage,
        author_id: ctx.auth?.id,
        micro_cms_id: microCmsId,
      };

      return await prisma.article.create({
        ...query,
        data: articleData,
      });
    },
  })
);

// 記事を更新
builder.mutationField('updateArticle', (t) =>
  t.prismaField({
    type: Article,
    errors: { types: [ZodError, CsrfError] },
    authScopes: { isAuthenticated: true },
    args: {
      id: t.arg.int({ required: true }),
      input: t.arg({ type: ArticleInput, required: true }),
      syncToMicroCMS: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();

      // 記事の存在確認
      const existingArticle = await prisma.article.findUnique({
        where: { id: args.id },
      });

      if (!existingArticle) {
        throw new Error('記事が見つかりませんでした');
      }

      // 権限チェック（管理者または作成者のみ）
      if (ctx.auth?.role !== 'ADMIN' && existingArticle.author_id !== ctx.auth?.id) {
        throw new Error('この記事を編集する権限がありません');
      }

      // microCMSに同期する場合
      if (args.syncToMicroCMS && existingArticle.micro_cms_id) {
        await updateArticleInMicroCMS(existingArticle.micro_cms_id, {
          title: args.input.title,
          content: args.input.content || '',
          excerpt: args.input.excerpt,
          status: args.input.status?.toLowerCase() as 'draft' | 'published' | 'archived' || 'draft',
          tags: args.input.tags || [],
          featuredImage: args.input.featuredImage ? { url: args.input.featuredImage, height: 0, width: 0 } : undefined,
        });
      }

      // ローカルDBの記事を更新
      const articleData = {
        title: args.input.title,
        content: args.input.content,
        excerpt: args.input.excerpt,
        status: args.input.status || existingArticle.status,
        published_at: args.input.publishedAt || 
          (args.input.status === 'PUBLISHED' && !existingArticle.published_at ? new Date() : existingArticle.published_at),
        tags: args.input.tags || [],
        featured_image: args.input.featuredImage,
      };

      return await prisma.article.update({
        ...query,
        where: { id: args.id },
        data: articleData,
      });
    },
  })
);

// 記事を削除
builder.mutationField('deleteArticle', (t) =>
  t.boolean({
    errors: { types: [ZodError, CsrfError] },
    authScopes: { isAuthenticated: true },
    args: {
      id: t.arg.int({ required: true }),
      deleteFromMicroCMS: t.arg.boolean({ required: false }),
    },
    resolve: async (_parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();

      // 記事の存在確認
      const existingArticle = await prisma.article.findUnique({
        where: { id: args.id },
      });

      if (!existingArticle) {
        throw new Error('記事が見つかりませんでした');
      }

      // 権限チェック（管理者または作成者のみ）
      if (ctx.auth?.role !== 'ADMIN' && existingArticle.author_id !== ctx.auth?.id) {
        throw new Error('この記事を削除する権限がありません');
      }

      // microCMSからも削除する場合
      if (args.deleteFromMicroCMS && existingArticle.micro_cms_id) {
        await deleteArticleFromMicroCMS(existingArticle.micro_cms_id);
      }

      // ローカルDBから記事を削除
      await prisma.article.delete({
        where: { id: args.id },
      });

      return true;
    },
  })
);

// 即時公開設定
builder.mutationField('publishArticleNow', (t) =>
  t.prismaField({
    type: Article,
    errors: { types: [ZodError, CsrfError] },
    authScopes: { isAuthenticated: true },
    args: {
      id: t.arg.int({ required: true }),
      syncToMicroCMS: t.arg.boolean({ required: false }),
    },
    resolve: async (query, _parent, args, ctx) => {
      if ((ctx.req as any).__csrfInvalid) throw new CsrfError();

      // 記事の存在確認
      const existingArticle = await prisma.article.findUnique({
        where: { id: args.id },
      });

      if (!existingArticle) {
        throw new Error('記事が見つかりませんでした');
      }

      // 権限チェック（管理者または作成者のみ）
      if (ctx.auth?.role !== 'ADMIN' && existingArticle.author_id !== ctx.auth?.id) {
        throw new Error('この記事を公開する権限がありません');
      }

      const now = new Date();

      // microCMSに同期する場合
      if (args.syncToMicroCMS && existingArticle.micro_cms_id) {
        await updateArticleInMicroCMS(existingArticle.micro_cms_id, {
          status: 'published',
        });
      }

      // 記事を即時公開に設定
      return await prisma.article.update({
        ...query,
        where: { id: args.id },
        data: {
          status: 'PUBLISHED',
          published_at: now,
        },
      });
    },
  })
);