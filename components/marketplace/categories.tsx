"use client";
import { Filter } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../ui/badge";

type Props = {};

const Categories = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Italian",
    "Thai",
    "American",
    "Japanese",
    "Mediterranean",
  ];
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-serif font-semibold mb-6 flex items-center">
        <Filter className="h-5 w-5 mr-2 text-[#D4AF37]" />
        Categories
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-3">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer text-sm py-3 px-5 capitalize whitespace-nowrap transition-all
              rounded-full duration-300 hover:shadow-md ${
              selectedCategory === category
                  ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                  : "hover:border-[#D4AF37]/50"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
