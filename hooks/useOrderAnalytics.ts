import { useState, useEffect } from "react";

interface DailyOrder {
  date: string;
  orders: number;
}

interface HourlyOrder {
  hour: number;
  orders: number;
}

interface OrderAnalyticsData {
  dailyOrders: DailyOrder[];
  statusDistribution: Record<string, number>;
  averageOrderValue: number;
  hourlyOrders: HourlyOrder[];
  loading: boolean;
  error: string | null;
}

const useOrderAnalytics = () => {
  const [data, setData] = useState<OrderAnalyticsData>({
    dailyOrders: [],
    statusDistribution: {},
    averageOrderValue: 0,
    hourlyOrders: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchOrderAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics/orders");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch order analytics");
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

    fetchOrderAnalytics();
  }, []);

  return data;
};

export default useOrderAnalytics;
