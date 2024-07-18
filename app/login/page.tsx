import { auth } from "@/auth";
import LoginComponent from "@/components/login";
import { SessionProvider } from "next-auth/react";
import GithubButton from "@/components/login/github-button";

export default async function LoginPage({}) {
  const session = await auth();
  return (
    <main className="flex flex-col items-center p-10 min-w-[320px] max-w-[500px]  mx-auto">
      <SessionProvider session={session}>
        <LoginComponent />
        <GithubButton />
      </SessionProvider>
    </main>
  );
}
