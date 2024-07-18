import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/app/api/auth/[...nextauth]/route";

export default async function GithubButton() {
  async function handleLogin() {
    try {
      await signIn("github");
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect("/login?error=" + error.message);
      }
      throw error;
    }
  }
  return (
    <Button type="submit" onClick={() => handleLogin()} className="w-full flex items-center space-x-2">
      <GithubIcon size={20} />
      <span>Sign in with Github</span>
    </Button>
  );
}
