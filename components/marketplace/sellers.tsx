"use client";
import { Flame } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent } from "../ui/carousel";

type Props = {};

const Sellers = (props: Props) => {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-semibold flex items-center">
          <Flame className="h-6 w-6 mr-2 text-gold animate-pulse" />
          Top Sellers
        </h2>
        <Button variant="link" className="font-medium text-gold">
          View All
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {//   isLoadingSellers ? (
          //     // Loading skeletons
          //     Array(4).fill(0).map((_, i) => (
          //       <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/4">
          //         <Card className="overflow-hidden">
          //           <CardContent className="p-0">
          //             <div className="p-6">
          //               <div className="flex items-center gap-4">
          //                 <Skeleton className="h-16 w-16 rounded-full" />
          //                 <div className="space-y-2">
          //                   <Skeleton className="h-4 w-24" />
          //                   <Skeleton className="h-4 w-16" />
          //                 </div>
          //               </div>
          //               <div className="mt-4 space-y-2">
          //                 <Skeleton className="h-4 w-full" />
          //                 <Skeleton className="h-4 w-3/4" />
          //               </div>
          //             </div>
          //           </CardContent>
          //         </Card>
          //       </CarouselItem>
          //     ))
          //   ) : (
          topSellers?.map((seller) => (
            <CarouselItem
              key={seller.id}
              className="pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <Link to={`/restaurants/${seller.id}`}>
                <Card
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1
                    border-gold/10 h-full"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border border-gold/20 ring-2 ring-gold/5">
                        <AvatarImage src={seller.logo} alt={seller.name} />
                        <AvatarFallback className="bg-gold/10 text-gold">
                          {seller.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{seller.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-gold fill-gold" />
                          <span className="text-sm ml-1 font-semibold">
                            {seller.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gold" />
                        {seller.cuisine} • {seller.deliveryTime}
                      </p>
                      <p className="flex items-center mt-1">
                        <ShoppingBag className="h-3 w-3 mr-1 text-gold" />
                        Min. order: ${seller.minimumOrder}
                      </p>
                    </div>
                    {seller.featured && (
                      <Badge
                        variant="secondary"
                        className="mt-4 bg-gold/10 text-gold border-gold/20"
                      >
                        <Sparkles className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                    )}
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

export default Sellers;
