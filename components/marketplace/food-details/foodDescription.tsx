"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFood from "@/hooks/useFood";
import { MenuItem } from "@/interface";
import React, { FC } from "react";
import AiAnalysis from "./aiAnalysis";
import {
  BotMessageSquare,
  Info,
  MessageSquare,
  Package,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ReviewTab from "./ReviewTab";

type Props = {
  id: string;
  foodItem: MenuItem;
};

const FoodDescription: FC<Props> = ({ id, foodItem }) => {
  return (
    <div className="container mx-auto py-12">
      <Tabs defaultValue="description" className="max-w-4xl mx-auto">
        <TabsList className="w-full bg-gray-100 py-5 rounded-full mb-8">
          <TabsTrigger
            value="description"
            className="rounded-full px-6 py-4 data-[state=active]:bg-white
              data-[state=active]:text-food-orange data-[state=active]:shadow-sm
              cursor-pointer"
          >
            <Info className="h-4 w-4 mr-2" />
            Description
          </TabsTrigger>
          <TabsTrigger
            value="ingredients"
            className="rounded-full px-6 py-4 data-[state=active]:bg-white
              data-[state=active]:text-food-orange data-[state=active]:shadow-sm
              cursor-pointer"
          >
            <Package className="h-4 w-4 mr-2" />
            Ingredients
          </TabsTrigger>
          <TabsTrigger
            value="aiAnalysis"
            className="rounded-full px-6 py-4 data-[state=active]:bg-white
              data-[state=active]:text-food-orange data-[state=active]:shadow-sm
              cursor-pointer"
          >
            <BotMessageSquare className="h-4 w-4 mr-2" />
            Chat with AI
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-full px-6 py-4 data-[state=active]:bg-white
              data-[state=active]:text-food-orange data-[state=active]:shadow-sm
              cursor-pointer"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4 font-playfair">
              About this dish
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {foodItem.description}
            </p>

            {foodItem.category && foodItem.category.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-3 font-playfair flex items-center gap-2">
                  <Tag className="h-4 w-4 text-food-orange" />
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {foodItem.category.map((cat, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-food-orange/10 text-food-orange hover:bg-food-orange/20 px-3 py-1 text-sm
                        font-medium"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ingredients" className="animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-6 font-playfair">
              Fresh Ingredients
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {foodItem.ingredients?.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100
                    hover:border-food-orange/20 hover:bg-food-orangeLight/20 transition-all group
                    cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-food-orangeLight flex items-center justify-center
                      text-food-orange group-hover:scale-110 transition-transform"
                  ></div>
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="aiAnalysis" className="animate-fade-in">
          <AiAnalysis foodItem={foodItem} />
        </TabsContent>
        <TabsContent value="reviews" className="animate-fade-in">
          <ReviewTab foodItem={foodItem} foodId={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodDescription;
