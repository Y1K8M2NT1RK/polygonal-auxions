import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      handle_name: string;
    } & DefaultSession["user"];
  }
}