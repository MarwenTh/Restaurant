import { useState, useEffect } from "react";

interface AdminMetricsData {
  totalOrders: number;
  orderPercentageChange: number;
  uniqueCustomers: number;
  customerPercentageChange: number;
  loading: boolean;
  error: string | null;
}

const useAdminMetrics = () => {
  const [data, setData] = useState<AdminMetricsData>({
    totalOrders: 0,
    orderPercentageChange: 0,
    uniqueCustomers: 0,
    customerPercentageChange: 0,
    loading: true,
    error: null,
  });

  const fetchAdminMetrics = async () => {
    try {
      const response = await fetch("/api/analytics/overview");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch admin metrics");
      }

      setData({
        totalOrders: result.totalOrders,
        orderPercentageChange: result.orderPercentageChange,
        uniqueCustomers: result.uniqueCustomers,
        customerPercentageChange: result.customerPercentageChange,
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
    fetchAdminMetrics();
  }, []);

  const retry = () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    fetchAdminMetrics();
  };

  return { ...data, retry };
};

export default useAdminMetrics;
