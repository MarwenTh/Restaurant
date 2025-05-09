import { useState, useEffect } from "react";

interface TodayRevenueData {
  todayRevenue: number;
  percentageChange: number;
  loading: boolean;
  error: string | null;
}

const useTodayRevenue = () => {
  const [data, setData] = useState<TodayRevenueData>({
    todayRevenue: 0,
    percentageChange: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTodayRevenue = async () => {
      try {
        const response = await fetch("/api/order/revenue/today");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch today's revenue");
        }

        setData({
          todayRevenue: result.todayRevenue,
          percentageChange: result.percentageChange,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          todayRevenue: 0,
          percentageChange: 0,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchTodayRevenue();
  }, []);

  return data;
};

export default useTodayRevenue;
