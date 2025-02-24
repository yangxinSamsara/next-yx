import { auth, signOut } from "@/auth";
import Home from "@/components/home";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Img1 from "./movies.png";

export default async function HomePage() {
  console.log("HomePage");
  const session = await auth();
  return (
    <main className="flex flex-col items-center p-10">
      {[{ title: "1", img: Img1 }].map((item) => (
        <Image key={item.title} width={100} height={100} src={item.img} alt={item.title} />
      ))}
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
