"use client";
import React, { useState } from "react";
import Header from "./header";
import useFood from "@/hooks/useFood";
import Categories from "./categories";
import Food from "./food";

type Props = {};

const Main = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    minRating: 0,
    maxDeliveryTime: 0,
    maxPrice: 0,
    sortBy: "",
  });

  return (
    <div className="min-h-screen bg-[#eee]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <Food
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
      />
    </div>
  );
};

export default Main;
