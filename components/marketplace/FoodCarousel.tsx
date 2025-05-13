"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuItem } from "@/interface";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

type FoodCarouselProps = {
  title?: string;
  subtitle?: string;
  items: MenuItem[];
  showSeeMore?: boolean;
};

const FoodCarousel: React.FC<FoodCarouselProps> = ({
  title,
  subtitle,
  items,
  showSeeMore = true,
}) => {
  const [api, setApi] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });

    api.on("reInit", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });

    // Check if we're at the end
    const checkIfEnd = () => {
      if (api.canScrollNext() === false) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
    };

    api.on("select", checkIfEnd);
    api.on("reInit", checkIfEnd);
    checkIfEnd();
  }, [api]);

  return (
    <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-900
                to-gray-600 bg-clip-text text-transparent"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
            )}
          </div>
          {showSeeMore && !isEnd && (
            <Link href="/marketplace">
              <Button
                variant="ghost"
                className="text-food-orange hover:text-food-orange/90 gap-2 group"
              >
                <span className="font-medium">See All</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          )}
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item, index) => (
                <CarouselItem
                  key={item._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link href={`/marketplace/food-details/${item._id}`}>
                    <Card
                      className="overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all
                        duration-300 h-full border-0 bg-white"
                    >
                      <div className="relative group">
                        <div className="h-56 w-full overflow-hidden">
                          <Image
                            width={500}
                            height={500}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500
                              group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        </div>
                        {item.discount && (
                          <div
                            className="absolute top-4 left-4 bg-food-red text-white text-sm font-bold px-3 py-1.5
                              rounded-full shadow-lg transform -rotate-3"
                          >
                            {item.discount}% OFF
                          </div>
                        )}
                        <button
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white
                            transition-colors duration-200 shadow-md"
                        >
                          <Heart className="h-5 w-5 text-gray-600 hover:text-food-red transition-colors" />
                        </button>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-2">
                            {item.category.map((cat, idx) => (
                              <Badge
                                key={idx}
                                className="bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-sm font-medium
                                  hover:bg-white transition-colors"
                              >
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl text-gray-800 line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="font-semibold text-food-orange text-lg">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.preparationTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                            <Image
                              src={
                                item.seller?.image || "/placeholder-avatar.png"
                              }
                              alt={item.seller?.name || "Seller"}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            by {item.seller?.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white hover:bg-gray-50 shadow-lg" />
            <CarouselNext className="hidden md:flex -right-4 bg-white hover:bg-gray-50 shadow-lg" />
          </Carousel>

          {isEnd && showSeeMore && (
            <div className="flex justify-center mt-12">
              <Link href="/marketplace">
                <Button
                  className="bg-food-orange text-white hover:bg-food-orange/90 px-10 py-6 rounded-full
                    text-lg font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all
                    duration-300 hover:scale-105"
                >
                  Explore All Dishes
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCarousel;
