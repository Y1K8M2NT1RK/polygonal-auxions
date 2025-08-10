import { schema } from '@/pages/api/schema';
import { createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { YogaContext } from './context';
import { GraphQLError } from 'graphql';
import { ZodError } from 'zod';
import { jwtVerify } from 'jose';
import { prisma } from './db';
import { User } from '../../../prisma/generated/client';
import { readFileSync } from 'fs';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations'
import { join } from 'path';

// ビルド後のファイルパスを指定
const persistedOperationsPath = join(process.cwd(), 'src/generated/persisted-operations.json');
const persistedOperations = JSON.parse(readFileSync(persistedOperationsPath, 'utf-8'));

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

export default createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  YogaContext
>({
  graphiql: process.env.NODE_ENV === "development",
  graphqlEndpoint: '/api/graphql',
  schema,
  plugins: [
    (() => {
      (
        process.env.NODE_ENV === "development"
        && process.env.npm_lifecycle_event === "graphql-codegen"
      )
      && usePersistedOperations({
        getPersistedOperation(key: string) {
          return persistedOperations[key];
        }
      })
    }),
  ],
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
