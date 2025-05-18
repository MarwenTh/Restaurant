"use client";
import { ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import { Badge } from "../ui/badge";
import useCategory from "@/hooks/useCategory";
import { Button } from "../ui/button";
import { useUrlFilters } from "@/hooks/useUrlFilters";

const Categories = () => {
  const { categories, loading, error, refetch } = useCategory();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { filters, toggleFilter } = useUrlFilters();
  const selectedCategory = filters.category;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section
      className="w-full bg-white/50 backdrop-blur-sm py-8 sticky top-20 z-20 border-y
        border-[#D4AF37]/10 rounded-2xl"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-semibold mb-6 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-[#D4AF37]" />
          Categories
        </h2>
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-white hover:text-[#D4AF37]"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-white hover:text-[#D4AF37]"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth mx-12"
          >
            <div className="flex space-x-3 py-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={`cursor-pointer text-sm py-3 px-6 capitalize whitespace-nowrap transition-all
                  rounded-full duration-300 hover:shadow-md ${
                  selectedCategory === "all"
                      ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                onClick={() => toggleFilter("category", "all")}
              >
                All Categories
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category._id}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  className={`cursor-pointer text-sm py-3 px-6 capitalize whitespace-nowrap transition-all
                  rounded-full duration-300 hover:shadow-md ${
                  selectedCategory === category.name
                      ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                  onClick={() => toggleFilter("category", category.name)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
