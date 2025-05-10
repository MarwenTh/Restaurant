"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingBag, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Seller {
  _id: string;
  name: string;
  image: string;
  description?: string;
  cuisine?: string[];
  rating?: number;
  address?: {
    city: string;
    state: string;
  };
  priceRange?: "low" | "medium" | "high";
}

const SellersCarousel = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch("/api/sellers");
        if (!response.ok) {
          throw new Error("Failed to fetch sellers");
        }
        const data = await response.json();
        setSellers(data.sellers);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch sellers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Top Sellers</h2>
        <Link href="/marketplace/sellers">
          <Button variant="ghost" className="text-gold hover:text-gold/80">
            View All
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            : sellers.map((seller) => (
                <CarouselItem
                  key={seller._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link href={`/marketplace/seller/${seller._id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16 border-2 border-gold/20">
                            <AvatarImage src={seller.image} alt={seller.name} />
                            <AvatarFallback className="text-xl bg-gold/10 text-gold">
                              {seller.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {seller.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-gold fill-gold" />
                                <span className="ml-1 text-sm font-medium">
                                  {seller.rating || "New"}
                                </span>
                              </div>
                              {seller.cuisine && seller.cuisine.length > 0 && (
                                <span className="text-sm text-gray-500">
                                  • {seller.cuisine[0]}
                                </span>
                              )}
                            </div>
                            {seller.address && (
                              <p className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {seller.address.city}, {seller.address.state}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="bg-gold/10 text-gold border-gold/20"
                          >
                            {seller.priceRange || "Medium"} Price Range
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gold hover:text-gold/80"
                          >
                            View Menu
                            <ShoppingBag className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
        <div className="hidden md:flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default SellersCarousel;
