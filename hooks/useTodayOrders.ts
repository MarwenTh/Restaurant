import { useState, useEffect } from "react";

interface TodayOrdersData {
  todayOrders: number;
  percentageChange: number;
  loading: boolean;
  error: string | null;
}

const useTodayOrders = () => {
  const [data, setData] = useState<TodayOrdersData>({
    todayOrders: 0,
    percentageChange: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const response = await fetch("/api/order/today");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch today's orders");
        }

        setData({
          todayOrders: result.todayOrders,
          percentageChange: result.percentageChange,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          todayOrders: 0,
          percentageChange: 0,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchTodayOrders();
  }, []);

  return data;
};

export default useTodayOrders;
