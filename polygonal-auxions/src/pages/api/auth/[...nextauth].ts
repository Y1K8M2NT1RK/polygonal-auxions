import type { Account, NextAuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth/next';
import type { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/pages/api/db';

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
            async authorize(credentials): Promise<User>{ return await prisma.user.findUnique({where: {email: credentials?.email},}); }
        }),
    ],
    callbacks: {
        jwt: async ({token, user}: { token: JWT, user: User & Account}) => {
            if( user != undefined ) token = {handle_name: user.handle_name, name: user.name, id: user.id, slug_id: user.slug_id};
            return token;
        },
        session: async ({session, token}: { session: Session, token: JWT }) => {
            if (session?.user) session.user = {name: token.name, handle_name: token.handle_name, id: token.id, slug_id: token.slug_id};
            return session;
        },
    },
}

export default NextAuth(authOptions);