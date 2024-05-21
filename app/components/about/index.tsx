"use client";
import React from "react";
import Pop, { PopMethods } from "./pop";
import { Button } from "antd";

const About = () => {
  const popRef = React.useRef<PopMethods>(null);
  const openPop = () => {
    popRef.current?.openModal();
  };
  return (
    <div className="flex items-center flex-col border border-gray-200 rounded-md p-4">
      <h1>组件传值 forwardRef</h1>
      <Button onClick={openPop}>open pop</Button>
      <Pop ref={popRef} />
    </div>
  );
};

export default About;
