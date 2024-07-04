"use client";
import { Cascader } from "antd";
import type { CascaderProps } from "antd/es/cascader";

export default function MyCascader() {
  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }

  const options: Option[] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  const onChange: CascaderProps<Option>["onChange"] = (value) => {
    console.log(value);
  };

  // Just show the latest item.
  const displayRender = (labels: string[]) => {
    return labels[labels.length - 1];
  };

  return <Cascader placeholder="请选择" options={options} expandTrigger="hover" displayRender={displayRender} onChange={onChange} />;
}
