import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
};

export const prisma = (
    global.prisma ||
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'], // クエリログを有効化
	}).$extends({
        query: {
            artwork: {
                async findMany({ args, query }) {
                    args.where = { ...args.where, deleted: false };
                    return query(args)
                },
            },
        }
    }) as PrismaClient
);

if (process.env.NODE_ENV !== "production") global.prisma = prisma;