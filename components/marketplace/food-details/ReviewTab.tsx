"use client";

import { MenuItem } from "@/interface";
import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  helpfulCount: number;
  response?: {
    text: string;
    date: string;
  };
}

type Props = {
  foodItem: MenuItem;
  foodId: string;
};

const ReviewTab: FC<Props> = ({ foodItem, foodId }) => {
  console.log("ReviewTab - Props:", { foodId, foodItem });
  const { data: session } = useSession();
  console.log("ReviewTab - Session:", session);
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    console.log("ReviewTab - useEffect triggered, foodId:", foodId);
    fetchReviews();
  }, [foodId]);

  const fetchReviews = async () => {
    console.log("ReviewTab - fetchReviews called");
    try {
      const url = `/api/reviews?foodId=${foodId}`;
      console.log("ReviewTab - Fetching reviews from:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("ReviewTab - Reviews response:", data);

      if (response.ok) {
        setReviews(data.reviews);
      } else {
        console.error("ReviewTab - Error fetching reviews:", data.error);
        toast({
          title: "Error",
          description: data.error || "Failed to fetch reviews",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("ReviewTab - Error in fetchReviews:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    console.log("ReviewTab - handleSubmitReview called", {
      userRating,
      comment,
      foodId,
    });

    if (!session) {
      console.log("ReviewTab - No session found");
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (userRating === 0) {
      console.log("ReviewTab - No rating provided");
      toast({
        title: "Rating required",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      console.log("ReviewTab - No comment provided");
      toast({
        title: "Comment required",
        description: "Please write a review comment",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      console.log("ReviewTab - Submitting review");
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId,
          rating: userRating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();
      console.log("ReviewTab - Submit review response:", data);

      if (response.ok) {
        toast({
          title: "Success",
          description: "Review submitted successfully",
        });
        setReviews([data.review, ...reviews]);
        setUserRating(0);
        setComment("");
        setShowReviewForm(false);
      } else {
        console.error("ReviewTab - Error submitting review:", data.error);
        toast({
          title: "Error",
          description: data.error || "Failed to submit review",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("ReviewTab - Error in handleSubmitReview:", error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    const displayRating = interactive ? hoverRating || userRating : rating;

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-5 h-5 transition-colors duration-200",
              interactive ? "cursor-pointer" : "cursor-default",
              displayRating >= star
                ? "fill-food-orange text-food-orange"
                : "fill-gray-200 text-gray-200",
            )}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => {
              if (interactive) {
                setUserRating(star);
                setHoverRating(0); // Reset hover state after selection
              }
            }}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-medium font-playfair mb-2">
              Customer Reviews
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(foodItem.rating || 0)}
                <span className="text-gray-600">
                  ({foodItem.reviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>
          {session && !showReviewForm && (
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-food-orange hover:bg-food-orange/90"
            >
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="border-t pt-6 mt-6">
            <h4 className="text-lg font-medium mb-4">Write Your Review</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {renderStars(userRating, true)}
                  {userRating > 0 && (
                    <span className="text-sm text-gray-500">
                      {userRating} {userRating === 1 ? "star" : "stars"}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this dish..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmitReview}
                  disabled={submitting}
                  className="bg-food-orange hover:bg-food-orange/90"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReviewForm(false);
                    setUserRating(0);
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this dish!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>
                      {review.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.customer}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{review.date}</span>
                      <span>•</span>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-food-orange"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpfulCount})
                </Button>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              {review.response && (
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Response from the restaurant</span>
                    <span>•</span>
                    <span>{review.response.date}</span>
                  </div>
                  <p className="text-gray-600">{review.response.text}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewTab;
