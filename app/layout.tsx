import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next App Yx",
  description: "create next app by yx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-auto">{children}</main>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
