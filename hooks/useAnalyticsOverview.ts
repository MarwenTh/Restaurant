import { useState, useEffect } from "react";

interface AnalyticsOverviewData {
  totalOrders: number;
  orderPercentageChange: number;
  totalSales: number;
  salesPercentageChange: number;
  uniqueCustomers: number;
  customerPercentageChange: number;
  averageRating: number;
  ratingChange: number;
  loading: boolean;
  error: string | null;
}

const useAnalyticsOverview = () => {
  const [data, setData] = useState<AnalyticsOverviewData>({
    totalOrders: 0,
    orderPercentageChange: 0,
    totalSales: 0,
    salesPercentageChange: 0,
    uniqueCustomers: 0,
    customerPercentageChange: 0,
    averageRating: 0,
    ratingChange: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAnalyticsOverview = async () => {
      try {
        const response = await fetch("/api/analytics/overview");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch analytics overview");
        }

        setData({
          ...result,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchAnalyticsOverview();
  }, []);

  return data;
};

export default useAnalyticsOverview;
