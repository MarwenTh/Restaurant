"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MenuItem } from "@/interface";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <div className="w-full py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-playfair">
              {title}
            </h2>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {showSeeMore && !isEnd && (
            <Link href="/marketplace">
              <Button
                variant="ghost"
                className="text-food-orange hover:text-food-orange/90 gap-2"
              >
                <span>See All</span>
                <ArrowRight size={16} />
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
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                      <div className="relative group">
                        <div className="h-48 w-full overflow-hidden">
                          <Image
                            width={500}
                            height={500}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300
                              group-hover:scale-110"
                          />
                        </div>
                        {item.discount && (
                          <div
                            className="absolute top-3 left-3 bg-food-red text-white text-xs font-bold px-2 py-1
                              rounded-full"
                          >
                            {item.discount}% OFF
                          </div>
                        )}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                            p-4"
                        >
                          <Badge
                            className="bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-sm
                              font-medium"
                          >
                            {item.category.join(", ")}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="font-semibold text-food-orange text-sm">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          by {item.seller?.name}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {isEnd && showSeeMore && (
            <div className="flex justify-center mt-8">
              <Link href="/marketplace">
                <Button
                  className="bg-food-orange text-white hover:bg-food-orange/90 px-8 py-6 rounded-full text-lg
                    font-medium cursor-pointer"
                >
                  See All Dishes
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
