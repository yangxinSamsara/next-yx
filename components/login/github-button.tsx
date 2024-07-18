import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export default async function GithubButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        // 登录完成后，重定向到user页面
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <Button className="w-full flex items-center space-x-2">
        <GithubIcon size={20} />
        <span>Sign in with Github</span>
      </Button>
    </form>
  );
}
