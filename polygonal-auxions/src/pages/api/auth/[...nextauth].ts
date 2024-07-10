import type { NextAuthOptions, Session, User } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/pages/api/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    debug: process.env.NODE_ENV === "development",
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'example@example.com',},
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials): Promise<any>{
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: {email: credentials?.email},
                });
                if( !user ) return null;

                const saltRounds = 10;
                const salt = genSaltSync(saltRounds);
                const hashedPassword = hashSync(user.password, salt);

                const isValidPassword = compareSync(credentials?.password, hashedPassword);
                if( !isValidPassword ) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        jwt: async ({token, user}: { token: JWT, user: User}) => {
            if( user != undefined ) token.user = user; token.id = user?.id;
            return token;
        },
        session: async ({session, token}: { session: Session, token: JWT }) => {
            if (session?.user) session.user = token.user;
            return session;
        },
    },
}

export default NextAuth(authOptions);