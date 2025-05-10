import { useState, useEffect } from "react";

export type ActivityType =
  | "order"
  | "user"
  | "review"
  | "alert"
  | "notification";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

interface ActivitiesData {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const useRecentActivities = () => {
  const [data, setData] = useState<ActivitiesData>({
    activities: [],
    loading: true,
    error: null,
  });

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/orders/recent");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch recent activities");
      }

      // Transform the orders into activities
      const activities: Activity[] = result.orders.map(
        (order: any, index: number) => ({
          id: order.id,
          type: "order" as ActivityType,
          title: "New order received",
          description: `Order #${order.id.slice(-5)} - ${order.total}`,
          time: order.date,
          user: {
            name: order.customer,
            initials: order.customer
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase(),
          },
        }),
      );

      setData({
        activities,
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
    fetchActivities();
  }, []);

  const retry = () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    fetchActivities();
  };

  return { ...data, retry };
};

export default useRecentActivities;
