import { schema } from '@/pages/api/schema';
import { createYoga } from 'graphql-yoga';
import { renderGraphiQL } from '@graphql-yoga/render-graphiql';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { YogaContext } from './context';
import { GraphQLError } from 'graphql';
import { ZodError } from 'zod';
import { CsrfError } from './types/errors';
import { jwtVerify } from 'jose';
import { prisma } from './db';
import { User } from '@prisma/client';
import { readFileSync } from 'fs';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations'
import { join } from 'path';

// ビルド後のファイルパスを指定
const persistedOperationsPath = join(process.cwd(), 'src/generated/persisted-operations.json');
let persistedOperations: Record<string, any> = {};
try {
  // 読み込みはオプション化（ファイル未生成でも API 全体を落とさない）
  persistedOperations = JSON.parse(readFileSync(persistedOperationsPath, 'utf-8'));
} catch (e) {
  console.warn('[graphql] persisted-operations.json not loaded (optional):', (e as Error).message);
}

// GraphQL-Yogaのcontextを設定
export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<YogaContext> => {
  const token = req.cookies?.token;

  let auth: User | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
      const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
      const user_id = (payload as any).id as number;
      if (typeof user_id === 'number') {
        auth = await prisma.user.findUnique({ where: { id: user_id } });
      }
    } catch (error) {
      console.error('トークン検証失敗:', error);
    }
  }

  return { req, res, auth };
};

// GraphiQL 有効化条件:
//  - NODE_ENV !== production ならデフォルト有効
//  - ただし GRAPHIQL=0 / false で明示的に無効化可能
//  - プロダクションでも緊急デバッグ用に GRAPHIQL=1 で強制有効化可 (推奨: 一時的利用)
const enableGraphiQL = (() => {
  const flag = (process.env.GRAPHIQL || '').toLowerCase();
  if (flag === '0' || flag === 'false') return false;
  if (flag === '1' || flag === 'true') return true;
  return process.env.NODE_ENV !== 'production';
})();

const yoga = createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  YogaContext
>({
  graphiql: enableGraphiQL,
  // Serve GraphiQL assets locally to comply with our CSP (no external CDN like unpkg)
  renderGraphiQL,
  graphqlEndpoint: '/api/graphql',
  schema,
  plugins: ((process.env.NODE_ENV === 'development' && process.env.npm_lifecycle_event === 'graphql-codegen')
    ? [
        usePersistedOperations({
          getPersistedOperation(key: string) {
            return persistedOperations[key];
          },
        }),
      ]
    : []),
  context: async ({ req, res }) => createContext(req, res),
  maskedErrors: {
    maskError(error, message) {
      console.error('GraphQL Error:', error); // エラーをログに記録
      const cause = (error as GraphQLError).originalError;

      // Validation Error
      if (cause instanceof ZodError)
        return new GraphQLError(message, {
          extensions: {
            http: { status: 400 },
            messages: (cause as ZodError).formErrors.fieldErrors,
          }
        });

      // CSRF domain error surfaced intentionally
      if (cause instanceof CsrfError) {
        return new GraphQLError(cause.message, {
          extensions: {
            http: { status: 403 },
            code: 'CSRF_INVALID',
          }
        });
      }
      // Other Error
      return new GraphQLError(message, {
        extensions: {
          http: { status: 500 },
          originalError: error,
        }
      });
    },
  },
});

// CSRF: Double Submit Cookie 検証 (Mutation POST 時のみ)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const bodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const isMutation = /\bmutation\b/i.test(bodyStr);
    if (isMutation) {
      const csrfCookie = (req as any).cookies?.csrfToken;
      const headerToken = (req.headers['x-csrf-token'] as string) || '';
      if (!csrfCookie || !headerToken || csrfCookie !== headerToken) {
        // login ミューテーションは GraphQL error 化 (フォームエラー扱い) するため早期 403 を避ける
        if (/login\s*\(/i.test(bodyStr)) {
          (req as any).__csrfInvalid = true;
        } else {
          res.status(403).send('Forbidden (CSRF token mismatch)');
          return;
        }
      }
    }
  }
  return yoga(req, res);
}
