import { List, ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ReactQuery({ data }: { data: any[] }) {
  const [theme, setTheme] = useState("light");
  const { theme: aaa } = useTheme();
  useEffect(() => {
    const currentTheme =
      aaa && aaa === "light"
        ? "light"
        : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    setTheme(currentTheme);
  }, [aaa]);

  return (
    <ConfigProvider theme={{ algorithm: theme === "dark" ? antdTheme.darkAlgorithm : undefined }}>
      <h1>{theme}</h1>

      <List
        className="w-full"
        itemLayout="horizontal"
        dataSource={data.reverse()}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.id + ". " + item.title} description={item.body} />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
