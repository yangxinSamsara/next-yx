"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConfigProvider from "antd/es/config-provider";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/lib/locale/zh_CN";
import { getQueryClient } from "./get-query-client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "@/components/ui/toaster";

dayjs.locale("zh-cn");
const ZhCNLocale: typeof zhCN = zhCN;
ZhCNLocale.DatePicker!.lang = {
  ...zhCN.DatePicker!.lang,
  monthFormat: "M月",
  shortWeekDays: ["日", "一", "二", "三", "四", "五", "六"],
};

export default function Providers({ children, ...props }: ThemeProviderProps) {
  const queryClient = getQueryClient();
  return (
    <NextThemesProvider {...props}>
      <AntdRegistry>
        <ConfigProvider locale={ZhCNLocale}>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ConfigProvider>
      </AntdRegistry>
    </NextThemesProvider>
  );
}
