"use client";
import { Button, Spin, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import ReactQueryComponent from "@/components/react-query";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  return res.json() as Promise<{ userId: number; id: number; title: string; body: string }[]>;
}

async function addPost({ title, body }: { title: string; body: string }) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
  });
}

async function generatePdfPuppeteer() {
  const response = await fetch("/api/generate/pdf", {
    method: "POST",
    body: JSON.stringify([
      {
        script: [
          "人物和场景：无",
          "镜头：黑暗背景中展示一些亮光点点",
          "灯光：仅有零星的橙红色亮光",
          "运镜：静止镜头",
          "画风：全黑背景量橙红色亮光，画面简洁神秘",
          "手法：无特殊拍摄手法",
          "手法：无特殊拍摄手法",
          "手法：无特殊拍摄手法",
        ],
        image:
          "https://cdn.pixabay.com/photo/2023/02/18/11/22/cactus-7797750_1280.jpg",
      },
    ]),
  });
  if (!response.ok) {
    throw new Error("Failed to generate PDF");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "generated.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

export default function ReactQueryPage() {
  console.log("ReactQueryPage");
  const queryClient = getQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error, isLoading, refetch } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  const mutation = useMutation({ mutationFn: addPost });

  if (error) {
    messageApi.error("Failed to load posts");
  }

  const mutationPdfPuppeteer = useMutation({ mutationFn: generatePdfPuppeteer });

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Button
        type="primary"
        loading={mutationPdfPuppeteer.isPending}
        onClick={() => {
          mutationPdfPuppeteer.mutate(undefined, {
            onSuccess() {
              messageApi.success("Generate pdf success");
            },
          });
        }}
      >
        generate pdf puppeteer
      </Button>
      <h1 className="uppercase">react-query</h1>
      {isLoading && (
        <Spin tip="Loading" size="small">
          <div style={contentStyle} />
        </Spin>
      )}
      {contextHolder}
      <Button
        type="primary"
        loading={mutation.isPending}
        onClick={() =>
          mutation.mutate(
            { title: "foo", body: "bar" },
            {
              onSuccess() {
                messageApi.success("Add post success");
                queryClient.invalidateQueries({ queryKey: ["posts"] });
                // refetch();
              },
            }
          )
        }
      >
        add post
      </Button>
      {data && <ReactQueryComponent data={data} />}
    </main>
  );
}
