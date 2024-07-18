import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const AuthOPtions: NextAuthConfig = {
  providers: [GitHub],
  pages: {
    signIn: "/login",
  },
};
