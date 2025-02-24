import { notFound } from "next/navigation";

const Blog = ({ params }: { params?: { params: string[] } }) => {
  console.log("🚀 ~ file: page.tsx:2 ~ Blog ~ ctx:", params);
  if (!params?.params) {
    return notFound();
  }
  return <div>{params?.params?.join("/")}博客页面</div>;
};

export default Blog;
