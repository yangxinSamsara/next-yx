import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Providers from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme='system' enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
