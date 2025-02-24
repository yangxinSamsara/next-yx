export default function Layout({
  children,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {analytics}
    </section>
  );
}
