import { schema } from './src/pages/api/schema';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

const config: CodegenConfig = {
  schema: printSchema(schema),
  overwrite: true,
  documents: [
    'src/graphql/mutations/*.graphql',
    'src/pages/**/graphql/queries/*.graphql',
    'src/pages/**/**/graphql/queries/*.graphql',
    'src/pages/**/graphql/mutations/*.graphql',
    'src/pages/**/**/graphql/mutations/*.graphql',
  ],
  emitLegacyCommonJSImports: false,
  generates: {
    'src/generated/graphql.ts': {
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