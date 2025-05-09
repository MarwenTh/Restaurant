import { useState, useEffect } from "react";

export interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  dish: string;
  avatar: string;
}

interface RecentReviewsData {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const useRecentReviews = () => {
  const [data, setData] = useState<RecentReviewsData>({
    reviews: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch("/api/reviews/recent");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch recent reviews");
        }

        setData({
          reviews: result.reviews,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          reviews: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchRecentReviews();
  }, []);

  return data;
};

export default useRecentReviews;
