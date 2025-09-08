import { createClient } from 'microcms-js-sdk';

// microCMS APIキー（ダミー値）
const API_KEY = process.env.MICROCMS_API_KEY || 'dummy-api-key-for-development';
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN || 'dummy-service';

export const microCMSClient = createClient({
  serviceDomain: SERVICE_DOMAIN,
  apiKey: API_KEY,
});

// microCMSのArticle型定義
export interface MicroCMSArticle {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: {
    url: string;
    height: number;
    width: number;
  };
  status: 'draft' | 'published' | 'archived';
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// microCMSから記事一覧を取得
export async function getArticlesFromMicroCMS(
  offset = 0,
  limit = 10,
  filters?: string
): Promise<MicroCMSListResponse<MicroCMSArticle>> {
  try {
    const response = await microCMSClient.get({
      endpoint: 'articles',
      queries: {
        offset,
        limit,
        ...(filters && { filters }),
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch articles from microCMS:', error);
    // ダミーデータを返す（開発用）
    return {
      contents: [],
      totalCount: 0,
      offset,
      limit,
    };
  }
}

// microCMSから単一記事を取得
export async function getArticleFromMicroCMS(
  contentId: string
): Promise<MicroCMSArticle | null> {
  try {
    const response = await microCMSClient.get({
      endpoint: 'articles',
      contentId,
    });
    return response;
  } catch (error) {
    console.error(`Failed to fetch article ${contentId} from microCMS:`, error);
    return null;
  }
}

// microCMSに記事を作成
export async function createArticleInMicroCMS(
  data: Omit<MicroCMSArticle, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'revisedAt'>
): Promise<{ id: string } | null> {
  try {
    const response = await microCMSClient.create({
      endpoint: 'articles',
      content: data,
    });
    return response;
  } catch (error) {
    console.error('Failed to create article in microCMS:', error);
    return null;
  }
}

// microCMSの記事を更新
export async function updateArticleInMicroCMS(
  contentId: string,
  data: Partial<Omit<MicroCMSArticle, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'revisedAt'>>
): Promise<boolean> {
  try {
    await microCMSClient.update({
      endpoint: 'articles',
      contentId,
      content: data,
    });
    return true;
  } catch (error) {
    console.error(`Failed to update article ${contentId} in microCMS:`, error);
    return false;
  }
}

// microCMSの記事を削除
export async function deleteArticleFromMicroCMS(
  contentId: string
): Promise<boolean> {
  try {
    await microCMSClient.delete({
      endpoint: 'articles',
      contentId,
    });
    return true;
  } catch (error) {
    console.error(`Failed to delete article ${contentId} from microCMS:`, error);
    return false;
  }
}