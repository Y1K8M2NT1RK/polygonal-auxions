import { schema } from '@/pages/api/schema';
import { createYoga } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLError } from 'graphql';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import { parse } from 'cookie';
import { User } from '../../../prisma/generated/client';
import { readFileSync } from 'fs';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations'
import { join } from 'path';

// ビルド後のファイルパスを指定
const persistedOperationsPath = join(process.cwd(), 'src/generated/persisted-operations.json');
const persistedOperations = JSON.parse(readFileSync(persistedOperationsPath, 'utf-8'));

export type Context = {
  res: NextApiResponse;
  req: NextApiRequest;
  auth: User | null;
};

// GraphQL-Yogaのcontextを設定
export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Context> => {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token || '';
  const refreshToken = cookies.refreshToken || '';

  let auth: User | null = null;
  if (token) {
    try {
      let decoded: { id: number };
      if( refreshToken ) decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET ?? '') as { id: number };
      else decoded = jwt.verify(token, process.env.JWT_SECRET ?? '') as { id: number };
      auth = await prisma.user.findUnique({ where: { id: decoded.id },});
    } catch (error) {
      console.error('トークンの特定がエラーにより不可:', error);
    }
  }

  return { req, res, auth };
};

export default createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  Context
>({
  graphiql: process.env.NODE_ENV === "development",
  graphqlEndpoint: '/api/graphql',
  schema,
  plugins: [
    usePersistedOperations({
      getPersistedOperation(key: string) {
        return persistedOperations[key];
      }
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
