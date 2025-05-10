import { useState, useEffect } from "react";

interface ChartDataPoint {
  name: string;
  sales: number;
  orders: number;
  customers: number;
}

interface ChartData {
  data: ChartDataPoint[];
  loading: boolean;
  error: string | null;
}

const useChartData = () => {
  const [data, setData] = useState<ChartData>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchChartData = async () => {
    try {
      const response = await fetch("/api/analytics/revenue");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch chart data");
      }

      // Transform the data to match the chart format
      const chartData = result.dailyRevenue.map((item: any) => ({
        name: new Date(item.date).toLocaleString("default", { month: "short" }),
        sales: item.revenue,
        orders: item.orders || 0,
        customers: item.customers || 0,
      }));

      setData({
        data: chartData,
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

  useEffect(() => {
    fetchChartData();
  }, []);

  const retry = () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    fetchChartData();
  };

  return { ...data, retry };
};

export default useChartData;
