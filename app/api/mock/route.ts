import { NextRequest } from "next/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function GET(request: NextRequest) {
  const res = await sleep(1000);
  const data = { title: "mock", request: request };

  return Response.json(data);
}
