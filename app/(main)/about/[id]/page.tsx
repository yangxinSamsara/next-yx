import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => ({
    id: id.toString(),
  }));
}
export default function AboutDetailPage({ params }: { params: { id: string } }) {
  if (params.id === "0") {
    return notFound();
  }

  return <main className="flex flex-col items-center justify-between p-24">params-id: {params.id}</main>;
}
