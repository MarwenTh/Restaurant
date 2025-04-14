"use client";
import {
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import useFood from "@/hooks/useFood";
import Image from "next/image";

type Props = {};

const Food = (props: Props) => {
  const { loading, error, menuItems, refetch, totalMenuItems } = useFood();
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  //    // Filter food items based on search query and selected category
  //   const filteredFoodItems = menuItems?.filter(item => {
  //     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                          item.seller?.name.toLowerCase().includes(searchQuery.toLowerCase())
  //                         //  item.category.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  //
  //     const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
  //
  //     return matchesSearch && matchesCategory;
  //   });
  const isItemAnimated = (index: number) => {
    return animatedItems.includes(index);
  };
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-semibold flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2 text-[#D4AF37]" />
          Available Foods
        </h2>
        <div>
          <Tabs defaultValue="trending" className="w-[400px]">
            <TabsList className="mb-2 bg-[#D4AF37]/10">
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-1" /> Trending
              </TabsTrigger>
              <TabsTrigger
                value="newest"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
              >
                <Sparkles className="h-4 w-4 mr-1" /> Newest
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
              >
                <ThumbsUp className="h-4 w-4 mr-1" /> Popular
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? // Loading skeletons
            Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-4/5" />
                      <Skeleton className="h-4 w-3/5" />
                      <Skeleton className="h-4 w-2/5" />
                    </div>
                  </CardContent>
                </Card>
              ))
          : menuItems?.map((item, index) => (
              <Link href={`/food/${item._id}`} key={item._id}>
                <Card
                  className={
                    "overflow-hidden border-[#D4AF37]/10 hover:shadow-xl transition-all duration-300 "
                  }
                  // ${isItemAnimated(index) ? "animate-fade-in" : "opacity-0"}
                  //   style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <Image
                      width={500}
                      height={500}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0
                        hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary rounded-full
                        hover:bg-white hover:text-[#D4AF37] shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        // Toggle favorite logic would go here
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 ${item.isFavorite ? "fill-red-500 text-red-500" : ""} transition-colors
                          duration-300`}
                      />
                    </Button>
                    <Badge className="absolute bottom-3 left-3 bg-[#D4AF37]/90 text-white hover:bg-[#D4AF37]">
                      ${item.price.toFixed(2)}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center mb-3">
                      <Avatar className="h-7 w-7 mr-2 border border-[#D4AF37]/20">
                        <AvatarImage
                          src={item.seller?.image}
                          alt={item.seller?.name}
                        />
                        <AvatarFallback>
                          {item.seller?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {item.seller?.name}
                      </span>
                    </div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="text-sm ml-1 font-semibold">
                          {/* {item.rating} */}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          {/* ({item.reviews}) */}
                        </span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1 text-[#D4AF37]" />
                        {/* {item.distance} */}
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div> */}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-5 pt-0 border-t border-[#D4AF37]/5">
                    <Badge
                      variant="outline"
                      className="text-xs flex items-center text-[#D4AF37]"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {/* {item.deliveryTime} */}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#D4AF37] hover:text-[#D4AF37]/80 hover:bg-[#D4AF37]/10"
                    >
                      Order Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
      </div>

      {/* {filteredFoodItems?.length === 0 && !loading && (
        <div className="text-center py-16 bg-[#D4AF37]/5 rounded-xl my-8">
          <h3 className="text-xl font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {filteredFoodItems && filteredFoodItems.length > 0 && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="px-8 py-6 text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30"
          >
            Load More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )} */}
    </section>
  );
};

export default Food;
