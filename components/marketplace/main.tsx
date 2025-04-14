"use client";
import React from "react";
import Header from "./header";
import useFood from "@/hooks/useFood";
import Categories from "./categories";
import Food from "./food";

type Props = {};

const Main = (props: Props) => {
  const {} = useFood();
  return (
    <div className="min-h-screen bg-[#eee]">
      <Header />
      <Categories />
      <Food />
    </div>
  );
};

export default Main;
