import { shuffle } from "@/app/utils";
export const dynamic = "force-dynamic";

export const revalidate = 10;
export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", { next: { revalidate: 20 } });
  const posts = await res.json();
  const data = shuffle(posts);
  return (
    <>
      <div>{new Date().toLocaleTimeString()}</div>
      <div>{JSON.stringify(data)}</div>;
    </>
  );
}
