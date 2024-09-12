import { sleep } from "@/app/utils";
import About from "@/components/about";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function AboutPage({ searchParams }: { searchParams?: any }) {
  console.log("🚀 ~ AboutPage ~ params:", searchParams);
  const res = await sleep(1000);
  console.log("🚀 ~ file: page.tsx:8 ~ AboutPage ~ res:", res);
  // redirect("/about/1234567890",);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex space-x-4 mb-8">
        {"01234".split("").map((item) => (
          <Link key={item} href={`/about/${item}`}>
            go to {item}
          </Link>
        ))}
      </div>
      <About />
    </main>
  );
}
