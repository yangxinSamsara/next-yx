'use client'
import { Button } from "@/components/ui/button";
import { PopoverDemo } from "@/components/shadcn/popover";
import { SelectDemo } from "@/components/shadcn/select";
import { DropdownMenuDemo } from "@/components/shadcn/dropdown";
import Cascader from "@/components/shadcn/cascader";
import MyCascader from "@/components/shadcn/my-cascader";

export default function ShadcnPage() {
  const options = [
    {
      label: "浙江",
      value: "zhejiang",
      children: [
        {
          label: "杭州",
          value: "hangzhou",
          children: [
            { label: "西湖区", value: "xihu" },
            { label: "滨江区", value: "binjiang" },
          ],
        },
      ],
    },
  ];
  return (
    <div className="flex">
      <div className="flex space-y-2 flex-col w-50 mx-auto">
        <Button variant="outline">Shadcn Ui Button</Button>
        <PopoverDemo />
        <SelectDemo />
        <DropdownMenuDemo />
        <Cascader />
        <MyCascader
          options={options}
          multiple={true}
          defaultValue={["xihu"]}
          onChange={(values) => console.log(values)}
          placeholder="请选择地区"
        />
      </div>
    </div>
  );
}
