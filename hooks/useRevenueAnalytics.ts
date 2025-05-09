import { useState, useEffect } from "react";

interface DailyRevenue {
  date: string;
  revenue: number;
}

interface HourlyRevenue {
  hour: number;
  revenue: number;
}

interface RevenueAnalyticsData {
  dailyRevenue: DailyRevenue[];
  totalRevenue: number;
  revenuePercentageChange: number;
  revenueByPaymentMethod: Record<string, number>;
  revenueByTimeOfDay: HourlyRevenue[];
  loading: boolean;
  error: string | null;
}

const useRevenueAnalytics = () => {
  const [data, setData] = useState<RevenueAnalyticsData>({
    dailyRevenue: [],
    totalRevenue: 0,
    revenuePercentageChange: 0,
    revenueByPaymentMethod: {},
    revenueByTimeOfDay: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRevenueAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/revenue");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch revenue analytics");
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

    fetchRevenueAnalytics();
  }, []);

  return data;
};

export default useRevenueAnalytics;
