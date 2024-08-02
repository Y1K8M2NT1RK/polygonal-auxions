import SchemaBuilder from '@pothos/core';
import { DateTimeResolver } from "graphql-scalars";
import type PrismaTypes from '@/pages/api/types/pothos';
import { prisma } from './db';
import { Context } from '@/pages/api/context';

import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtilsPlugin from "@pothos/plugin-prisma-utils";
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

import ValidationPlugin from '@pothos/plugin-validation';
import ErrorsPlugin from '@pothos/plugin-errors';

// ScopeAuthPluginは不要？->まだアンインストールしてない

export const builder = new SchemaBuilder<{
  Context: Context;
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
  ],
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

