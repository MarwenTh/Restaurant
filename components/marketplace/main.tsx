"use client";
import React from "react";
import Header from "./header";
import Food from "./food";

const Main = () => {
  return (
    <div className="min-h-screen bg-[#eee]">
      <Header />
      <Food />
    </div>
  );
};

export default Main;
