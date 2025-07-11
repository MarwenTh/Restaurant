"use client";
import useFood from "@/hooks/useFood";
import { HashLoader } from "react-spinners";
import FoodCarousel from "@/components/marketplace/FoodCarousel";

const FeaturedRestaurants = () => {
  const { error, loading, menuItems } = useFood();

  // Limit to 12 items for the carousel
  const previewItems = menuItems?.slice(0, 12);

  return (
    <div className="w-full" id="featured">
      <div className="text-center max-w-3xl mx-auto pt-10">
        <span
          className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
            font-medium tracking-wider mb-6 reveal dark:bg-[#D4AF37]/20"
        >
          Featured Restaurants
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 reveal
            dark:text-white"
        >
          Discover Our Most Popular Dishes
        </h2>
        <p className="text-gray-700 text-lg reveal dark:text-gray-300">
          Explore our most popular restaurants, known for their quality cuisine,
          exceptional service, and unforgettable dining experiences.
        </p>
      </div>
      {loading && (
        <div className="flex items-center justify-center p-10">
          <HashLoader color="#ff6b00" />
        </div>
      )}

      {menuItems?.length === 0 && (
        <div className="text-center text-gray-500">No dishes found</div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {!loading && menuItems && menuItems.length > 0 && (
        <FoodCarousel items={previewItems || []} showSeeMore={true} />
      )}
    </div>
  );
};

export default FeaturedRestaurants;
