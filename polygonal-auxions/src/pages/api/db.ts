import { PrismaClient } from '.prisma/client/index.js';

// export const prisma = new PrismaClient();
declare global {
    var prisma: PrismaClient | undefined
};

export const prisma =
	global.prisma ||
	new PrismaClient({
		log:
            process.env.NODE_ENV === "production"
            ? ["warn", "error"]
            : ["query", "info", "warn", "error"],
	});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;