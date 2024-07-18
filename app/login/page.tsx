import { Button } from "@/components/ui/button";
import { signIn } from "../api/auth/[...nextauth]/route";

export default function LoginPage({}) {
  return (
    <main>
      <div className="flex min-h-screen gap-3  items-center  justify-center">
        <form
          action={async () => {
            "use server";
            // 登录完成后，重定向到user页面
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <Button>github登录</Button>
        </form>
      </div>
    </main>
  );
}
