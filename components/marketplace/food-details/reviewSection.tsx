"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  isHelpful?: boolean;
}

interface ReviewSectionProps {}

const initialReviews = [
  {
    id: "review-1",
    user: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rating: 5,
    date: "May 15, 2023",
    comment:
      "Absolutely delicious! The combination of mango and avocado is perfect. Will definitely order again!",
    helpful: 12,
    isHelpful: false,
  },
  {
    id: "review-2",
    user: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    rating: 4,
    date: "April 23, 2023",
    comment:
      "Really enjoyed this sushi roll. The spice level was just right for me. Would recommend trying it at least once.",
    helpful: 8,
    isHelpful: false,
  },
  {
    id: "review-3",
    user: {
      name: "Sophie Wilson",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    rating: 5,
    date: "March 17, 2023",
    comment:
      "One of the best specialty rolls I've ever had! The freshness of the ingredients really stands out.",
    helpful: 15,
    isHelpful: false,
  },
];

const ReviewSection: React.FC<ReviewSectionProps> = ({}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const markAsHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: review.isHelpful
                ? review.helpful - 1
                : review.helpful + 1,
              isHelpful: !review.isHelpful,
            }
          : review,
      ),
    );
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && rating > 0) {
      const newReview: Review = {
        id: `review-${Date.now()}`,
        user: {
          name: "You",
          avatar: "",
        },
        rating,
        date: new Date().toLocaleDateString(),
        comment: reviewText,
        helpful: 0,
      };

      setReviews([newReview, ...reviews]);
      setReviewText("");
      setRating(0);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "#FFC107" : "none"}
          className={index < rating ? "text-food-yellow" : "text-gray-300"}
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-playfair">Customer Reviews</h2>
          <span className="flex items-center gap-1.5">
            <span className="text-food-yellow">
              <Star size={20} fill="#FFC107" />
            </span>
            <span className="font-medium">
              {reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length || 0}
            </span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </span>
        </div>

        <div className="mb-12 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredRating(index + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(index + 1)}
                  >
                    <Star
                      size={24}
                      fill={
                        (hoveredRating || rating) > index ? "#FFC107" : "none"
                      }
                      className={`transition-all ${
                      (hoveredRating || rating) > index
                          ? "text-food-yellow"
                          : "text-gray-300"
                      } ${
                      hoveredRating > 0 && hoveredRating === index + 1
                          ? "scale-125"
                          : ""
                      }`}
                    />
                  </button>
                ))}
            </div>
            <span className="text-gray-500 text-sm">
              {rating > 0 ? `You rated ${rating} stars` : "Rate this dish"}
            </span>
          </div>

          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this dish..."
            className="mb-4 min-h-32 resize-none"
          />

          <Button
            onClick={handleSubmitReview}
            disabled={reviewText.trim() === "" || rating === 0}
            className="bg-food-orange hover:bg-food-orange/90 text-white"
          >
            Submit Review
          </Button>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in"
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={review.user.avatar}
                      alt={review.user.name}
                    />
                    <AvatarFallback>
                      {review.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.user.name}</div>
                    <div className="text-gray-500 text-sm">{review.date}</div>
                  </div>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-gray-500 hover:text-food-orange gap-1.5
                  ${review.isHelpful ? "text-food-orange" : ""}`}
                  onClick={() => markAsHelpful(review.id)}
                >
                  <ThumbsUp
                    size={16}
                    className={review.isHelpful ? "fill-food-orange" : ""}
                  />
                  <span>Helpful ({review.helpful})</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-food-orange gap-1.5"
                >
                  <MessageSquare size={16} />
                  <span>Reply</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
