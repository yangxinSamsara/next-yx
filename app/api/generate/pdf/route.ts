import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json(); // 解析传入的JSON数据
    const data = Array(10)
      .fill(json[0])
      .map((item, index: number) => {
        if (index % 2 === 0) {
          return {
            ...item,
            script: Array(9).fill(`手法：无特殊拍摄手法${index}`),
          };
        }
        return item;
      });

    const containersPerPage = 4; // 每页容器数量
    const pages = Math.ceil(data.length / containersPerPage); // 计算总页数

    const htmlContent = `
      <html>
        <head>
          <style>
            @page {
              margin:30px 30px 0 30px;
            }
            body { font-family: Arial, sans-serif; }
            .container { width: 100%; display: flex; margin-bottom: 20px; }
            .image { width:320px; height: 180px; border-radius: 10px;overflow: hidden; position: relative; }
            .image img { width: 320px; height: 100%; object-fit: cover; }
            .index { position: absolute; bottom: 10px; right: 10px; font-size: 16px; color: white !important; }
            .text { flex: 1; margin-left: 20px; padding: 10px; border-radius: 10px; background: rgba(0, 0, 0, 0.05);border: 1px solid rgba(0, 0, 0, 0.1); }
            .text p { margin: 0;font-size: 14px; }
            .page-break { page-break-after: always; } // 添加分页样式
          </style>
        </head>
        <body>
          ${Array.from({ length: pages }).map((_, pageIndex) => `
            <div class="page-break">
              ${data.slice(pageIndex * containersPerPage, (pageIndex + 1) * containersPerPage)
                .map((item: any, index: number) => `
                <div class="container">
                  <div class="image">
                    <img src="${item.image}" />
                    <span class="index">${pageIndex * containersPerPage + index + 1}/${data.length}</span>
                  </div>
                  <div class="text">
                    ${item.script.map((line: any) => `<p>${line}</p>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </body>
      </html>
    `;

    // 启动puppeteer并生成PDF
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: "",
      footerTemplate:
        '<div style="font-size:14px; width:100%; text-align:center; padding:10px;color: red;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return new NextResponse(JSON.stringify({ message: "生成PDF时出错", error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
