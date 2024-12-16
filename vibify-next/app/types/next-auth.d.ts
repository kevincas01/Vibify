import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the JWT interface to include custom fields like accessTokenExpires
declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      userId: string;
      accessTokenExpires: number;
    };
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
    userId: string;
    accessTokenExpires: number;
  }
}
