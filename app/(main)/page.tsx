import Home from "@/components/home";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="flex flex-col items-center p-10">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button>github 登出</Button>
      </form>
      <Home session={session} />
    </main>
  );
}
