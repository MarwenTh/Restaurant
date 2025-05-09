import { useState, useEffect } from "react";
import { RevenueDataPoint } from "@/components/dashboard/RevenueChart";

interface WeeklyRevenueData {
  revenueData: RevenueDataPoint[];
  loading: boolean;
  error: string | null;
}

const useWeeklyRevenue = () => {
  const [data, setData] = useState<WeeklyRevenueData>({
    revenueData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      try {
        const response = await fetch("/api/revenue/weekly");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to fetch weekly revenue data",
          );
        }

        setData({
          revenueData: result.revenueData,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          revenueData: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchWeeklyRevenue();
  }, []);

  return data;
};

export default useWeeklyRevenue;
