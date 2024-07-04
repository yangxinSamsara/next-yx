"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";

export default function Nav() {
  const pathname = usePathname();

  const navs = [
    { name: "about", path: "/about" },
    { name: "antd", path: "/antd" },
    { name: "svg", path: "/svg" },
    { name: "react-query", path: "/react-query" },
    { name: "headless-ui", path: "/headless-ui" },
    { name: "shadcn-ui", path: "/shadcn-ui" },
  ];

  return (
    <header className="flex items-center justify-center h-10">
      <ul className="flex items-center">
        {navs.map((nav) => (
          <li
            key={nav.name}
            className={cn("mr-2 hover:text-blue-500 hover:underline", {
              "text-blue-300": pathname !== nav.path,
              "text-blue-700": pathname === nav.path,
            })}
          >
            <Link href={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
