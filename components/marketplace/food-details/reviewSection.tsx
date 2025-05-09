"use client";

import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import useUser from "@/hooks/useUser";

interface Review {
  _id: string;
  client: {
    _id: string;
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount: number;
  response?: {
    responder: {
      _id: string;
      name: string;
      image?: string;
    };
    text: string;
    date: string;
  };
}

interface ReviewSectionProps {
  sellerId: string | undefined;
  orderRef?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  sellerId,
  orderRef,
}) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (sellerId) {
      setPage(1);
      fetchReviews(1);
    }
  }, [sellerId, sortBy]);

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating(Number((total / reviews.length).toFixed(1)));
    } else {
      setAverageRating(0);
    }
  }, [reviews]);

  const loadMore = async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    setError(null);
    try {
      const nextPage = page + 1;
      await fetchReviews(nextPage);
      setPage(nextPage);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more reviews",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) {
      setError("Reply cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          reply: replyText,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit reply");
      }

      const data = await response.json();
      setReviews(
        reviews.map((review) =>
          review._id === reviewId
            ? { ...review, response: data.review.response }
            : review,
        ),
      );
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit reply");
    }
  };

  const fetchReviews = async (pageNum = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      }

      const params = new URLSearchParams({
        sellerId: sellerId || "",
        page: pageNum.toString(),
        sort: sortBy,
        limit: "5",
      });

      const response = await fetch(`/api/review?${params.toString()}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch reviews");
      }

      const data = await response.json();

      if (pageNum === 1) {
        setReviews(data.reviews);
        setTotalReviews(data.total || data.reviews.length);
      } else {
        setReviews((prev) => [...prev, ...data.reviews]);
      }

      setHasMore(data.reviews.length >= 5);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
      if (pageNum > 1) {
        setPage((prev) => Math.max(1, prev - 1));
      }
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const markAsHelpful = async (reviewId: string, isHelpful: boolean) => {
    if (!session) {
      setError("Please sign in to mark reviews as helpful");
      return;
    }

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          isHelpful,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update helpful count");
      }

      const data = await response.json();
      setReviews(
        reviews.map((review) =>
          review._id === reviewId
            ? { ...review, helpfulCount: data.review.helpfulCount }
            : review,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update helpful count",
      );
    }
  };

  const handleSubmitReview = async () => {
    if (!session) {
      setError("Please sign in to submit a review");
      return;
    }

    if (!reviewText.trim()) {
      setError("Please enter a review comment");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Seller: sellerId,
          client: user?._id,
          rating,
          comment: reviewText,
          orderRef,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit review");
      }

      const data = await response.json();
      setReviews([data.review, ...reviews]);
      setReviewText("");
      setRating(0);
      setTotalReviews((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
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

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-playfair">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  const newSort = e.target.value as
                    | "newest"
                    | "oldest"
                    | "highest"
                    | "lowest";
                  setSortBy(newSort);
                }}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8
                  text-sm focus:outline-none focus:ring-2 focus:ring-food-orange
                  focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2
                  text-gray-500"
              >
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <span className="flex items-center gap-1.5">
              <span className="text-food-yellow">
                <Star size={20} fill="#FFC107" />
              </span>
              <span className="font-medium">{averageRating}</span>
              <span className="text-gray-500">({totalReviews} reviews)</span>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div
              className="w-8 h-8 border-4 border-food-orange border-t-transparent rounded-full
                animate-spin"
            />
          </div>
        ) : (
          <>
            {session && (
              <div className="mb-12 bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
                              (hoveredRating || rating) > index
                                ? "#FFC107"
                                : "none"
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
                    {rating > 0
                      ? `You rated ${rating} stars`
                      : "Rate this dish"}
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
                  disabled={
                    reviewText.trim() === "" || rating === 0 || isSubmitting
                  }
                  className="bg-food-orange hover:bg-food-orange/90 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No reviews yet. Be the first to review!
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`bg-white rounded-2xl p-6 shadow-sm ${
                      review.client._id === sellerId
                        ? "border-2 border-food-orange"
                        : ""
                      }`}
                  >
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={review.client?.image}
                            alt={review.client?.name}
                          />
                          <AvatarFallback>
                            {review.client?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div
                            className={`font-medium ${review.client._id === sellerId ? "text-food-orange" : ""}`}
                          >
                            {review.client?.name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {review.response && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={review.response.responder?.image}
                              alt={review.response.responder?.name}
                            />
                            <AvatarFallback>
                              {review.response.responder?.name?.charAt(0) ||
                                "R"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">
                            {review.response.responder?.name}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(
                              review.response.date,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          {review.response.text}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-food-orange gap-1.5"
                        onClick={() => markAsHelpful(review._id, true)}
                      >
                        <ThumbsUp size={16} />
                        <span>Helpful ({review.helpfulCount})</span>
                      </Button>

                      {user?._id === sellerId && !review.response && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-food-orange gap-1.5"
                          onClick={() => setReplyingTo(review._id)}
                        >
                          <MessageSquare size={16} />
                          <span>Reply</span>
                        </Button>
                      )}
                    </div>

                    {replyingTo === review._id && (
                      <div className="mt-4">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="mb-2"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReply(review._id)}
                            disabled={!replyText.trim()}
                            className="bg-food-orange hover:bg-food-orange/90 text-white"
                          >
                            Submit Reply
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  variant="outline"
                  className="w-full max-w-xs mx-auto"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 border-2 border-food-orange border-t-transparent rounded-full
                          animate-spin"
                      />
                      Loading...
                    </div>
                  ) : (
                    "Load More Reviews"
                  )}
                </Button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
