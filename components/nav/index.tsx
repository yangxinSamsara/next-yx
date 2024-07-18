"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import Image from "next/image";
import path from "path";
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
    <header className="flex items-center justify-between p-5 bg-gray-100">
      <Image className="relative" src="/next.svg" alt="Next.js Logo" width={150} height={30} priority />
      <ul className="flex items-center">
        {navs.map((nav) => (
          <li
            key={nav.name}
            className={cn("mr-2 hover:text-black hover:font-bold hover:underline", {
              "text-black font-normal": pathname !== nav.path,
              "text-black font-bold": pathname === nav.path,
            })}
          >
            <Link href={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
      <div></div>
    </header>
  );
}
