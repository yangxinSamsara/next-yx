"use client";
import { Button, DatePicker, theme as antdTheme } from "antd";
import MyCascader from "@/components/antd/cascader";
import ConfigProvider from "antd/lib/config-provider";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/lib/locale/zh_CN";
import { useEffect, useState } from "react";

dayjs.locale("zh-cn");
const ZhCNLocale: typeof zhCN = zhCN;
ZhCNLocale.DatePicker!.lang = {
  ...zhCN.DatePicker!.lang,
  monthFormat: "M月",
  shortWeekDays: ["日", "一", "二", "三", "四", "五", "六"],
};
export default function AntdComponent() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const currentTheme =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(currentTheme);
  }, []);
  return (
    <ConfigProvider locale={ZhCNLocale} theme={{ algorithm: theme === "dark" ? antdTheme.darkAlgorithm : undefined }}>
      <Button type="primary">antd button</Button>
      <MyCascader />
      <DatePicker />
    </ConfigProvider>
  );
}
