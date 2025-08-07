import { schema } from './src/pages/api/schema';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: printSchema(schema),
  overwrite: true,
  documents: [
    'src/pages/api/graphql/mutations/*.graphql',
    'src/pages/api/graphql/queries/*.graphql',
    'src/pages/api/graphql/inputs.graphql',
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
    ...(() => {
      if (
            process.env.NODE_ENV === "development"
        &&  process.env.npm_lifecycle_event === "graphql-codegen"
      ) {
        return {
          'src/generated/persisted-operations.json': {
            plugins: [
              {
                'graphql-codegen-persisted-query-ids': {
                  output: 'server',
                  algorithm: 'sha256',
                },
              },
            ],
          },
          'src/generated/client-persisted-operations.json': {
            plugins: [
              {
                'graphql-codegen-persisted-query-ids': {
                  output: 'client',
                  algorithm: 'sha256',
                },
              },
            ],
          },
        };
      }
      return {};
    }),
  },
};

export default config;