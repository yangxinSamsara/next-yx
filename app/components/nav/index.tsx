"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-center h-10">
      <ul className="flex items-center">
        <li
          className={cn("mr-2 hover:text-blue-500 hover:underline", {
            "text-blue-300": pathname !== "/about",
            "text-blue-700": pathname === "/about",
          })}
        >
          <Link href="/about">about</Link>
        </li>
        <li  className={cn("mr-2 hover:text-blue-500 hover:underline", {
            "text-blue-300": pathname !== "/antd",
            "text-blue-700": pathname === "/antd",
          })}>
          <Link href="/antd">antd</Link>
        </li>

        <li  className={cn("mr-2 hover:text-blue-500 hover:underline", {
            "text-blue-300": pathname !== "/svg",
            "text-blue-700": pathname === "/svg",
          })}>
          <Link href="/svg">svg</Link>
        </li>
      </ul>
    </header>
  );
}
