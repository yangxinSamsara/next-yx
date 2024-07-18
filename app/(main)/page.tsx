import { auth, signOut } from "@/auth";
import Home from "@/components/home";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="flex flex-col items-center p-10">
      {session?.user && (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button>github 登出</Button>
        </form>
      )}
      <Home session={session} />
    </main>
  );
}
