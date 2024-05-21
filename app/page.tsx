import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-10">
      <Image className="relative" src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    </main>
  );
}
