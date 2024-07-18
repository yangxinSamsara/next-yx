import { Button, DatePicker } from "antd";
import React from "react";
import MyCascader from "@/components/antd/cascader";

export default function AboutPage() {
  return (
    <main className="flex flex-col space-y-5 items-center p-20">
      <Button type="primary">antd button</Button>
      <MyCascader />
      <DatePicker />
    </main>
  );
}
