import { useState, useEffect } from "react";
import { Order } from "@/components/dashboard/OrdersTable";

interface RecentOrdersData {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const useRecentOrders = () => {
  const [data, setData] = useState<RecentOrdersData>({
    orders: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await fetch("/api/orders/recent");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch recent orders");
        }

        setData({
          orders: result.orders,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setData({
          orders: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchRecentOrders();
  }, []);

  return data;
};

export default useRecentOrders;
