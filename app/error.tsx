"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    // 收集错误日志，发送给服务端
    console.error("11", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p>Error Name: {error.name}</p>
      <p>Error Message: {error.message}</p>
      <p>Error Stack: {error.stack}</p>
      <p>Error Digest: {error.digest}</p>
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </div>
  );
}
