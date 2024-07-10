import { schema } from '@/pages/api/schema';
import { createYoga, } from 'graphql-yoga';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { GraphQLError } from 'graphql';
import { ZodError } from 'zod';

export type Context = {
  res: NextApiResponse;
  req: NextApiRequest;
};

export default createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  Context
>({
  graphqlEndpoint: '/api/graphql',
  schema,
  context: async ({ req, res }) => {
    const auth = await getServerSession(req, res, authOptions)
    return ({ req, res, auth })
  },
  maskedErrors: {
    maskError(error, message) {
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
          http: { status: 500 }
        }
      });
    },
  },
});
