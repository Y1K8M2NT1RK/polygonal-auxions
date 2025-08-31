import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = (global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
}).$extends({
  query: {
    artwork: {
      async findMany({ args, query }: { args: any; query: any }) {
        args.where = { ...args.where, deleted: false };
        return query(args);
      },
    },
  },
})) as PrismaClient;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
