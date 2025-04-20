import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MenuItem } from "@/interface";

type Props = {
  foodItem: MenuItem[];
};

const RecommendedFoods: React.FC<Props> = ({ foodItem }) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-playfair">
            You Might Also Like
          </h2>
          <Link href="/marketplace" className="cursor-pointer">
            <Button
              variant="ghost"
              className="text-food-orange hover:text-food-orange/90 gap-2 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItem.map((food, index) => (
            <Link
              href={`/marketplace/food-details/${food._id}`}
              key={food._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all
                group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform
                    duration-500"
                />
                {food.discount && (
                  <div
                    className="absolute top-3 left-3 bg-food-red text-white text-xs font-bold px-2 py-1
                      rounded-full"
                  >
                    {food.discount}% OFF
                  </div>
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0
                    group-hover:opacity-100 transition-opacity"
                >
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-medium bg-food-orange/80 inline-block px-2 py-0.5 rounded-full mb-1">
                      {food.category.join(", ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-food-orange transition-colors">
                  {food.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <Star size={14} fill="#FFC107" className="text-food-yellow" />
                  <span className="text-sm font-medium">{food.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({food.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {food.discount ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-food-orange">
                        $
                        {(
                          food.price -
                          (food.price * food.discount) / 100
                        ).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${food.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-food-orange">
                      ${food.price.toFixed(2)}
                    </span>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full aspect-square p-0 h-8 w-8 bg-food-orangeLight text-food-orange
                      hover:bg-food-orange hover:text-white"
                  >
                    <span className="sr-only">Add to cart</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFoods;
