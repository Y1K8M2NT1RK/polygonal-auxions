import type { DefaultUser } from "next-auth";

type AuthUser = {
  handle_name: string;
  slug_id: string;
}

declare module "next-auth" {
  interface Session { user: AuthUser & DefaultSession["user"]; }
  type User = AuthUser & DefaultUser["user"]
}

declare module "next-auth/jwt" {
  type JWT = AuthUser & DefaultJWT["user"]
}