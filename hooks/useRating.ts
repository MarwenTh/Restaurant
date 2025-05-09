import { useState, useEffect } from "react";

interface RatingData {
  rating: number;
  percentageChange: number;
  totalReviews: number;
  loading: boolean;
  error: string | null;
}

const useRating = () => {
  const [data, setData] = useState<RatingData>({
    rating: 0,
    percentageChange: 0,
    totalReviews: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch("/api/review/rating");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch rating data");
        }

        setData({
          rating: result.rating,
          percentageChange: result.percentageChange,
          totalReviews: result.totalReviews,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          rating: 0,
          percentageChange: 0,
          totalReviews: 0,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchRating();
  }, []);

  return data;
};

export default useRating;
