"use client";
import useFood from "@/hooks/useFood";
import Image from "next/image";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button"; // if using shadcn/ui or tailwind-styled button

const FeaturedRestaurants = () => {
  const { error, loading, menuItems } = useFood();

  // Limit to 8 items (2 rows if 4 columns)
  const previewItems = menuItems?.slice(0, 8);

  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-16 pt-20">
        <span
          className="inline-block px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-sm
            font-medium tracking-wider mb-6 reveal dark:bg-[#D4AF37]/20"
        >
          FEATURED RESTAURANTS
        </span>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 reveal
            dark:text-white"
        >
          Explore Our Top-Rated Plates
        </h2>
        <p className="text-gray-700 text-lg reveal dark:text-gray-300">
          Discover the most loved restaurants on our platform, known for their
          exceptional food quality, service, and unique culinary experiences.
        </p>
      </div>
      {loading && (
        <div className="flex items-center justify-center p-10">
          <HashLoader color="#ff6b00" />
        </div>
      )}

      {menuItems?.length === 0 && (
        <div className="text-center text-gray-500">No menu items found</div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="px-4">
        <div
          id="featured"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {previewItems?.map((item, idx) => (
            <Link href={`/food/${item._id}`} className="block" key={idx}>
              <Card
                className="overflow-hidden rounded-2xl shadow-lg bg-white transition-transform transform
                  hover:-translate-y-1 hover:shadow-2xl duration-300 h-full"
              >
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
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent
                      p-4"
                  >
                    <Badge
                      className="bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-sm
                        font-medium"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="font-semibold text-food-orange text-sm">
                      ${item.price.toFixed(2)}
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
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link href="/marketplace">
            <Button className="bg-food-orange text-white hover:bg-orange-600 transition cursor-pointer">
              See All Dishes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
