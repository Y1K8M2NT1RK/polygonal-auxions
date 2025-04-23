import { schema } from './src/pages/api/schema';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/graphql/v1`
    : printSchema(schema),
  overwrite: true,
  documents: [
    'src/pages/api/graphql/mutations/*.graphql',
    'src/pages/api/graphql/queries/*.graphql',
  ],
  emitLegacyCommonJSImports: false,
  generates: {
    'src/generated/generated-graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
    'src/generated/persisted-operations.json': {
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            output: 'server',
            algorithm: 'sha256',
          }
        },
      ],
    },
    'src/generated/client-persisted-operations.json': {
      plugins: [
        {
          'graphql-codegen-persisted-query-ids': {
            output: 'client',
            algorithm: 'sha256',
          }
        },
      ],
    },
  },
};

export default config;