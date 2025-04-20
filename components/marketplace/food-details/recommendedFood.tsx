import React from "react";
import { MenuItem } from "@/interface";
import FoodCarousel from "@/components/marketplace/FoodCarousel";

type Props = {
  foodItem: MenuItem[];
};

const RecommendedFoods: React.FC<Props> = ({ foodItem }) => {
  return (
    <div className="bg-gray-50 py-16">
      <FoodCarousel
        title="You Might Also Like"
        subtitle="Discover similar dishes you might enjoy"
        items={foodItem}
        showSeeMore={true}
      />
    </div>
  );
};

export default RecommendedFoods;
