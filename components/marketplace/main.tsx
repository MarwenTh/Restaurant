"use client";
import React from "react";
import Header from "./header";
import Food from "./food";
import SellersCarousel from "./UsersCarousel";

const Main = () => {
  return (
    <div className="min-h-screen bg-[#eee]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SellersCarousel />
        <Food />
      </div>
    </div>
  );
};

export default Main;
