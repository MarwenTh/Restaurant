"use client";
import {
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import useFood from "@/hooks/useFood";
import Image from "next/image";
import Categories from "./categories";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { cn, formatCurrency } from "@/lib/utils";

const Food = () => {
  const {
    loading,
    error,
    menuItems,
    refetch,
    totalMenuItems,
    loadMore,
    hasMore,
  } = useFood();
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const { filters } = useUrlFilters();

  const { search: searchQuery, category: selectedCategory } = filters;

  // Filter and sort food items based on search query, selected category, and filters
  const filteredFoodItems = menuItems?.filter((item) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || item.category.includes(selectedCategory);

    // Rating filter
    const matchesRating =
      filters.minRating === 0 ||
      (item.rating && item.rating >= filters.minRating);

    // Preparation time filter
    const matchesPreparationTime =
      filters.preparationTime === 0 ||
      (item.preparationTime && item.preparationTime <= filters.preparationTime);

    // Price filter
    const matchesPrice =
      filters.maxPrice === 0 || item.price <= filters.maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesRating &&
      matchesPreparationTime &&
      matchesPrice
    );
  });

  // Sort the filtered items
  const sortedFoodItems = [...(filteredFoodItems || [])].sort((a, b) => {
    if (filters.sortBy === "price-asc") {
      return a.price - b.price;
    } else if (filters.sortBy === "price-desc") {
      return b.price - a.price;
    } else if (filters.sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    } else if (filters.sortBy === "popularity") {
      return (b.popularity || 0) - (a.popularity || 0);
    }
    return 0;
  });

  const isItemAnimated = (index: number) => {
    return animatedItems.includes(index);
  };

  return (
    <section className="container mx-auto px-4 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl font-serif font-semibold flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-[#D4AF37]" />
          Available Foods
        </h2>
      </div>

      <Categories />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {loading
          ? // Loading skeletons
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-lg">
                  <Skeleton className="h-56 w-full" />
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-4/5" />
                      <Skeleton className="h-4 w-3/5" />
                      <Skeleton className="h-4 w-2/5" />
                    </div>
                  </CardContent>
                </Card>
              ))
          : sortedFoodItems?.map((item) => (
              <Link
                href={`marketplace/food-details/${item._id}`}
                key={item._id}
              >
                <Card
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all
                    duration-300 bg-white rounded-xl group"
                >
                  <div className="relative">
                    <Image
                      width={500}
                      height={500}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0
                        group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <Badge className="absolute bottom-3 left-3 bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 z-10">
                      {formatCurrency(item.price)}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2 border border-[#D4AF37]/20">
                          <AvatarImage
                            src={item.seller?.image}
                            alt={item.seller?.name}
                          />
                          <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                            {item.seller?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium truncate max-w-[120px]">
                          {item.seller?.name}
                        </span>
                      </div>
                    </div>
                    <h3
                      className="font-medium text-lg mb-2 line-clamp-1 group-hover:text-[#D4AF37]
                        transition-colors"
                    >
                      {item.name}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {item.category.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {item.category.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10"
                        >
                          +{item.category.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {sortedFoodItems?.length === 0 && !loading && (
        <div className="text-center py-16 bg-[#D4AF37]/5 rounded-xl my-8">
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {hasMore && sortedFoodItems && sortedFoodItems.length > 0 && (
        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="px-8 py-6 text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10
              hover:border-[#D4AF37]/30"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Food;
