"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Star, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

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
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
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

  if (loading) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-semibold">Top Sellers</h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/3 lg:basis-1/5"
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-semibold">Top Sellers</h2>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {sellers.map((seller) => (
            <CarouselItem
              key={seller._id}
              className="pl-4 md:basis-1/3 lg:basis-1/5"
            >
              <Link href={`/marketplace/seller/${seller._id}`}>
                <Card
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                    border-gold/10 h-full"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 border border-gold/20 ring-2 ring-gold/5 mb-3">
                      <AvatarImage src={seller.image} alt={seller.name} />
                      <AvatarFallback className="bg-gold/10 text-gold">
                        {seller.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">{seller.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="border-gold/30 text-gold hover:bg-gold/10 -left-6" />
          <CarouselNext className="border-gold/30 text-gold hover:bg-gold/10 -right-6" />
        </div>
      </Carousel>
    </section>
  );
};

export default SellersCarousel;
