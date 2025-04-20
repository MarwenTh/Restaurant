"use client";
import FoodDescription from "@/components/marketplace/food-details/foodDescription";
import FoodDetails from "@/components/marketplace/food-details/foodDetails";
import RecommendedFoods from "@/components/marketplace/food-details/recommendedFood";
import ReviewSection from "@/components/marketplace/food-details/reviewSection";
import { Button } from "@/components/ui/button";
import useFood from "@/hooks/useFood";
import { MenuItem } from "@/interface";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { id } = useParams();
  const { menuItems, loading, error } = useFood();
  const foodItem = menuItems?.find((item) => item._id === id) as MenuItem;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 w-32 bg-gray-200 rounded mb-8"></div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !foodItem) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Food item not found</h2>
        <p className="text-muted-foreground mb-8">
          The food item you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/marketplace">
          <Button className="bg-[#D4AF37] hover:bg-[#D4AF37]/90">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <FoodDetails id={id as string} foodItem={foodItem} />
      <FoodDescription id={id as string} foodItem={foodItem} />
      <ReviewSection />
      <RecommendedFoods foodItem={menuItems} />
    </>
  );
};

export default Page;
