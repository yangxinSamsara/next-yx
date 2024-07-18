import { AuthOPtions } from "@/auth";
import NextAuth from "next-auth";

const { handlers, signIn, signOut, auth } = NextAuth(AuthOPtions);
export { signIn, signOut, auth };
export const { GET, POST } = handlers;
