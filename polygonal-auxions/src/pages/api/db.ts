import { PrismaClient } from '.prisma/client/index.js';

declare global {
    var prisma: PrismaClient | undefined
};

export const prisma = (
    global.prisma ||
	new PrismaClient({
		log:
            process.env.NODE_ENV === "production"
            ? ["warn", "error"]
            : ["query", "info", "warn", "error"],
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