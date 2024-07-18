import NextAuth from "next-auth";
import GithubProviders from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GithubProviders],
});
