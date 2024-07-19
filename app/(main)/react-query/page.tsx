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

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

export default function ReactQueryPage() {
  const queryClient = getQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error, isLoading, refetch } = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  const mutation = useMutation({ mutationFn: addPost });

  if (error) {
    messageApi.error("Failed to load posts");
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
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
