import Nav from "../../components/nav";
import Providers from "../providers";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("MainLayout");
  return (
    <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-auto">{children}</main>
      </div>
    </Providers>
  );
}
