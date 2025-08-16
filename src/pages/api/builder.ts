import SchemaBuilder from '@pothos/core';
import { DateTimeResolver } from "graphql-scalars";
import type PrismaTypes from '@/pages/api/types/pothos';
import { prisma } from './db';
import { YogaContext } from './context';

import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtilsPlugin from "@pothos/plugin-prisma-utils";
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

import ScopeAuthPlugin from '@pothos/plugin-scope-auth';

import ValidationPlugin from '@pothos/plugin-validation';
import ErrorsPlugin from '@pothos/plugin-errors';

export const builder = new SchemaBuilder<{
  AuthScopes: { 
    isAuthenticated: boolean;
    isAdmin: boolean;
  };
  Context: YogaContext;
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [
    PrismaPlugin,
    PrismaUtilsPlugin,
    SimpleObjectsPlugin,
    ValidationPlugin,
    ErrorsPlugin,
    ScopeAuthPlugin,
  ],
  scopeAuth: {
    authScopes: async (context) => ({ 
      isAuthenticated: !!context.auth,
      isAdmin: context.auth?.role === 'ADMIN',
    }),
  },
  prisma: {
    client: prisma,
  },
  validationOptions: {
    validationError: (zodError, _args, _context, _info) => zodError,
  },
  errorOptions: {
    defaultTypes: [],
  },
});

// DateTime
builder.addScalarType('Date', DateTimeResolver);

// GraphQL Query = SELECT
builder.queryType({});

// GraphQL Mutation = INSERT UPDATE DELETE
builder.mutationType({});

