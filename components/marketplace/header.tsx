"use client";
import {
  ChevronDown,
  Timer,
  Filter,
  Search,
  ShoppingBag,
  Star,
  DollarSign,
  ThumbsUp,
  ArrowUpDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { SiIfood } from "react-icons/si";
import { useUrlFilters, FilterKeys } from "@/hooks/useUrlFilters";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { filters, toggleFilter, resetFilters, updateFilters } =
    useUrlFilters();

  // Handle search input with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  return (
    <main className="bg-gradient-to-b from-white to-amber-50/50">
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black"
          >
            <span className="text-xl md:text-2xl font-bold text-[#f97415] flex items-center space-x-2">
              <SiIfood size={40} />
              Food<span className="text-[#e64d19]">Guide</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div
            className="bg-gradient-to-r from-[#D4AF37]/10 to-amber-50 rounded-2xl p-8 md:p-12 shadow-lg
              relative overflow-hidden border border-[#D4AF37]/10"
          >
            <div
              className="absolute inset-0
                bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=60')]
                opacity-10 bg-cover bg-center"
            ></div>
            <div className="relative z-10">
              <h1
                className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-to-r from-[#D4AF37]
                  to-amber-600 animate-fade-in"
              >
                Discover Delicious Food
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl animate-fade-in">
                Order from the best local restaurants with easy, on-demand
                delivery right to your door.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-5 w-5 text-[#D4AF37]" />
                  <Input
                    placeholder="Search for food, restaurants, cuisines..."
                    className="pl-12 py-6 text-base border-[#D4AF37]/20 focus:border-[#D4AF37]
                      focus:ring-[#D4AF37]/30 shadow-md bg-white/80 backdrop-blur-sm rounded-xl"
                    value={filters.search}
                    onChange={handleSearchChange}
                  />
                </div>

                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex gap-2 py-6 border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]
                        cursor-pointer rounded-xl shadow-md"
                    >
                      <Filter className="h-5 w-5" />
                      <span className="text-base">Filters</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-72 p-4 rounded-xl shadow-lg"
                  >
                    <DropdownMenuLabel className="font-semibold">
                      Filter Options
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <div className="py-2">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-[#D4AF37]" />
                        Minimum Rating
                      </h3>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant={
                              filters.minRating === rating
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={
                              filters.minRating === rating
                                ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                                : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                            }
                            onClick={() => toggleFilter("minRating", rating)}
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="py-2">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Timer className="h-4 w-4 mr-2 text-[#D4AF37]" />
                        Preparation Time
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[5, 10, 15, 20, 30].map((time) => (
                          <Button
                            key={time}
                            variant={
                              filters.preparationTime === time
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className={
                              filters.preparationTime === time
                                ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                                : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                            }
                            onClick={() =>
                              toggleFilter("preparationTime", time)
                            }
                          >
                            {time} min
                          </Button>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="py-2">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-[#D4AF37]" />
                        Maximum Price
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[10, 15, 20, 30, 50].map((price) => (
                          <Button
                            key={price}
                            variant={
                              filters.maxPrice === price ? "default" : "outline"
                            }
                            size="sm"
                            className={
                              filters.maxPrice === price
                                ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                                : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                            }
                            onClick={() => toggleFilter("maxPrice", price)}
                          >
                            {price} dt
                          </Button>
                        ))}
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div className="py-2">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <ArrowUpDown className="h-4 w-4 mr-2 text-[#D4AF37]" />
                        Sort By
                      </h3>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant={
                            filters.sortBy === "price-asc"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={
                            filters.sortBy === "price-asc"
                              ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                              : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          }
                          onClick={() => toggleFilter("sortBy", "price-asc")}
                        >
                          Price: Low to High
                        </Button>
                        <Button
                          variant={
                            filters.sortBy === "price-desc"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={
                            filters.sortBy === "price-desc"
                              ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                              : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          }
                          onClick={() => toggleFilter("sortBy", "price-desc")}
                        >
                          Price: High to Low
                        </Button>
                        <Button
                          variant={
                            filters.sortBy === "rating" ? "default" : "outline"
                          }
                          size="sm"
                          className={
                            filters.sortBy === "rating"
                              ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                              : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          }
                          onClick={() => toggleFilter("sortBy", "rating")}
                        >
                          Rating
                        </Button>
                        <Button
                          variant={
                            filters.sortBy === "popularity"
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className={
                            filters.sortBy === "popularity"
                              ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90"
                              : "hover:border-[#D4AF37] hover:text-[#D4AF37]"
                          }
                          onClick={() => toggleFilter("sortBy", "popularity")}
                        >
                          Popularity
                        </Button>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <Button
                      variant="outline"
                      className="w-full mt-2 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:border-[#D4AF37]"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Header;
