"use client";
import React from "react";
import {
  Clock,
  ShoppingCart,
  TrendingUp,
  CircleDollarSign,
  Star,
  DollarSign,
  ShoppingBag,
  Users,
  StarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RevenueChart from "../RevenueChart";
import OrdersTable from "../OrdersTable";
import MetricsCard from "../MetricsCard";
import StatCard from "@/components/StatCard";
import { formatCurrency } from "@/lib/utils";
import useTodayOrders from "@/hooks/useTodayOrders";
import useTodayRevenue from "@/hooks/useTodayRevenue";
import useRating from "@/hooks/useRating";
import useWeeklyRevenue from "@/hooks/useWeeklyRevenue";
import useRecentOrders from "@/hooks/useRecentOrders";
import useRecentReviews from "@/hooks/useRecentReviews";
import { CiMoneyBill } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";

const revenueData = [
  { name: "Mon", revenue: 150 },
  { name: "Tue", revenue: 230 },
  { name: "Wed", revenue: 224 },
  { name: "Thu", revenue: 180 },
  { name: "Fri", revenue: 350 },
  { name: "Sat", revenue: 450 },
  { name: "Sun", revenue: 420 },
];

const recentOrders = [
  {
    id: "1234",
    customer: "John Doe",
    items: "Pasta Carbonara x2",
    total: 42.99,
    status: "completed" as const,
    date: "2023-07-15",
  },
  {
    id: "1235",
    customer: "Jane Smith",
    items: "Margherita Pizza, Tiramisu",
    total: 32.5,
    status: "processing" as const,
    date: "2023-07-15",
  },
  {
    id: "1236",
    customer: "David Johnson",
    items: "Chicken Tacos x3",
    total: 28.75,
    status: "pending" as const,
    date: "2023-07-15",
  },
  {
    id: "1237",
    customer: "Sarah Williams",
    items: "Sushi Combo",
    total: 45.0,
    status: "completed" as const,
    date: "2023-07-14",
  },
];

const popularDishes = [
  { name: "Margherita Pizza", orders: 48, percentage: 80 },
  { name: "Pasta Carbonara", orders: 32, percentage: 65 },
  { name: "Tiramisu", orders: 24, percentage: 50 },
  { name: "Garlic Bread", orders: 18, percentage: 35 },
  { name: "Caesar Salad", orders: 12, percentage: 25 },
];

const recentReviews = [
  {
    id: "1",
    customer: "John Doe",
    rating: 5,
    comment: "Absolutely delicious! Will order again.",
    date: "15 Jul 2023",
    dish: "Pasta Carbonara",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    customer: "Sarah Williams",
    rating: 4,
    comment: "Great taste, but delivery was a bit late.",
    date: "14 Jul 2023",
    dish: "Margherita Pizza",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    customer: "Michael Johnson",
    rating: 5,
    comment: "Perfect as always!",
    date: "13 Jul 2023",
    dish: "Tiramisu",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const metrics = [
  {
    title: "Total Revenue",
    value: "$83,248.42",
    icon: DollarSign,
    change: 12.5,
    trend: "up" as const,
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Orders",
    value: "2,845",
    icon: ShoppingBag,
    change: 8.2,
    trend: "up" as const,
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    title: "Processing Time",
    value: "18 min",
    icon: Users,
    change: 12.4,
    trend: "up" as const,
    iconColor: "bg-green-100 text-green-600",
  },
  {
    title: "Rating",
    value: "4.8/5",
    icon: StarIcon,
    change: 4.2,
    trend: "down" as const,
    iconColor: "bg-purple-100 text-purple-600",
  },
];

const SellerOverview: React.FC = () => {
  const { todayOrders, percentageChange: orderPercentageChange } =
    useTodayOrders();
  const { todayRevenue, percentageChange: revenuePercentageChange } =
    useTodayRevenue();
  const {
    rating,
    percentageChange: ratingPercentageChange,
    totalReviews,
  } = useRating();
  const { revenueData, loading: revenueLoading } = useWeeklyRevenue();
  const { orders, loading: ordersLoading } = useRecentOrders();
  const { reviews, loading: reviewsLoading } = useRecentReviews();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Today's Orders"
          value={todayOrders}
          icon={<ShoppingBag size={24} />}
          percentageChange={orderPercentageChange}
        />
        <StatCard
          title="Today's Revenue"
          value={`$${todayRevenue.toFixed(2)}`}
          icon={<CiMoneyBill size={24} />}
          percentageChange={revenuePercentageChange}
        />
        <StatCard
          title="Rating"
          value={`${rating}/5`}
          icon={<Star size={24} />}
          percentageChange={ratingPercentageChange}
          color="yellow"
          delay={3}
        />
      </div>
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart
              data={revenueData}
              title="This Week's Revenue"
              loading={revenueLoading}
            />
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviewsLoading ? (
                  <div className="space-y-5">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-[150px]" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="pb-4 border-b last:border-b-0 last:pb-0"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={review.avatar}
                              alt={review.customer}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">
                                    {review.customer}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {review.date} · {review.dish}
                                  </p>
                                </div>
                                <div
                                  className="flex items-center bg-yellow-100 text-food-yellow px-2 py-1 rounded-full text-xs
                                    dark:text-black"
                                >
                                  {review.rating}{" "}
                                  <Star
                                    size={12}
                                    className="ml-1 text-yellow-500"
                                  />
                                </div>
                              </div>
                              <p className="text-sm mt-2">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No reviews yet
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="gap-6 mb-6">
          <div className="lg:col-span-2">
            <OrdersTable
              orders={orders}
              title="Today's Orders"
              loading={ordersLoading}
            />
          </div>
          <div className="lg:col-span-1"></div>
        </div>
      </main>
    </div>
  );
};

export default SellerOverview;
