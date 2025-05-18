"use client";
import React, { useState, FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Heart, Star, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem, User } from "@/interface";
import { cn, formatCurrency } from "@/lib/utils";
import useOrderStore from "@/store/useOrderStore";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

type Props = {
  id: string;
  foodItem: MenuItem;
};

const FoodDetails: FC<Props> = ({ id, foodItem }) => {
  const { user, loading: userLoading } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const liked = false;
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      rating: 5,
      comment:
        "Absolutely delicious! The flavors were amazing and the presentation was beautiful.",
      date: "2 days ago",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      rating: 4,
      comment:
        "Great taste but a bit too spicy for my liking. Would order again with less heat.",
      date: "1 week ago",
    },
    {
      id: "3",
      user: {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      rating: 5,
      comment:
        "One of the best dishes I've had in a long time. Highly recommend!",
      date: "2 weeks ago",
    },
  ]);

  const navigate = useRouter();

  const {
    order,
    isLoading,
    error,
    setOrder,
    clearOrder,
    setIsLoading,
    setError,
  } = useOrderStore();

  const handleOrderNow = () => {
    if (!user) {
      navigate.push("/auth/login");
      return;
    }

    setIsOrdering(true);
    setOrder({
      _id: `temp_${Date.now()}`,
      client: user._id || "",
      seller: foodItem.seller?._id || "",
      items: [
        {
          menuItem: foodItem,
          quantity,
          unitPrice: foodItem.price,
        },
      ],
      status: "pending",
      totalAmount: foodItem.price * quantity,
      discountAmount: foodItem.discount
        ? (foodItem.price * foodItem.discount) / 100
        : 0,
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      quantity: quantity,
    });
    navigate.push("/order");
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(quantity + 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() && userRating > 0) {
      const newReview: Review = {
        id: Date.now().toString(),
        user: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        rating: userRating,
        comment: reviewText,
        date: "Just now",
      };
      setReviews([newReview, ...reviews]);
      setReviewText("");
      setUserRating(0);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="relative w-full bg-gradient-to-b from-food-orangeLight/80 to-white pb-8 pt-6
        overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-full
          bg-[url('https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2574')]
          bg-cover opacity-10"
      ></div>
      <div className="container mx-auto px-4 relative">
        <Link href="/marketplace">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-[#D4AF37]/10 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from-food-orange/20 to-food-yellow/20
                  rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-105"
              ></div>
              <img
                src={foodItem.image}
                alt={foodItem.name}
                className="relative rounded-3xl w-full max-w-md h-auto object-cover shadow-xl
                  transition-transform duration-500 group-hover:scale-[1.02]
                  group-hover:shadow-2xl"
              />
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  `absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm border-none
                  hover:bg-white transition-all duration-300 shadow-md`,
                  liked
                    ? "text-food-red hover:text-food-red/80"
                    : "text-gray-500 hover:text-food-red",
                )}
                // onClick={toggleLike}
              >
                <Heart
                  size={20}
                  fill={liked ? "#F44336" : "none"}
                  className={cn(
                    "transition-all duration-300",
                    liked && "animate-bounce-subtle",
                  )}
                />
              </Button>

              <div
                className="absolute -bottom-4 right-10 bg-white rounded-full px-4 py-2 shadow-lg flex
                  items-center gap-1.5 overflow-hidden group-hover:shadow-xl transition-transform
                  duration-300 group-hover:translate-y-1"
              >
                <span className="text-food-yellow">
                  <Star size={18} fill="#FFC107" />
                </span>
                <span className="font-medium">{foodItem.rating}</span>
                <span className="text-gray-500 text-sm">
                  ({foodItem.reviews})
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 stagger-animation">
            <div
              className="inline-block px-3 py-1 rounded-full bg-food-greenLight text-food-green text-sm
                font-medium mb-4"
            >
              Featured
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-gray-900 mb-4">
              {foodItem.name}
            </h1>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {foodItem.preparationTime} min
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat size={18} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  By {foodItem.seller?.name}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              {foodItem.discount ? (
                <>
                  <span className="text-3xl font-bold text-food-orange">
                    {formatCurrency(
                      foodItem.price -
                        (foodItem.price * foodItem.discount) / 100,
                    )}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(foodItem.price)}
                  </span>
                  <span className="text-sm font-medium bg-food-redLight text-food-red px-2 py-0.5 rounded-md">
                    {foodItem.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-food-orange">
                  {formatCurrency(foodItem.price)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleOrderNow}
                variant="outline"
                className="border-food-orange text-food-orange hover:bg-food-orangeLight rounded-full px-8
                  h-12 cursor-pointer"
                disabled={userLoading || isOrdering}
              >
                {userLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-food-orange"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : isOrdering ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-food-orange"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Order Now"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
