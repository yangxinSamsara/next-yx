"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import Image from "next/image";
import { ModeToggle } from "@/components/shadcn/toggle";
export default function Nav() {
  let pathname = usePathname();

  const navs = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "antd", path: "/antd" },
    { name: "svg", path: "/svg" },
    { name: "react-query", path: "/react-query" },
    { name: "headless-ui", path: "/headless-ui" },
    { name: "shadcn-ui", path: "/shadcn-ui" },
    { name: "react-hook-form", path: "/react-hook-form" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/90 backdrop-blur-md flex items-center justify-between p-5 shadow-">
      <Image className="relative" src="/next.svg" alt="Next.js Logo" width={150} height={30} priority />
      <ul className="flex items-center">
        {navs.map((nav) => (
          <li
            key={nav.name}
            className={cn("mr-2 hover:text-foreground/80 hover:underline", {
              "text-foreground/60": pathname !== nav.path,
              "text-foreground": pathname === nav.path,
            })}
          >
            <Link href={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
}
