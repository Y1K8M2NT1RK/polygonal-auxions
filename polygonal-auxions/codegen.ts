import { schema } from './src/pages/api/schema';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: printSchema(schema),
  overwrite: true,
  documents: [
    'src/pages/api/graphql/mutations/*.graphql',
    'src/pages/api/graphql/queries/*.graphql',
  ],
  emitLegacyCommonJSImports: false,
  generates: {
    'src/pages/generated-graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;