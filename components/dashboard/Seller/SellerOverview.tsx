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
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            trend={metric.trend}
            iconColor={metric.iconColor}
          />
        ))}
      </div>
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} title="This Week's Revenue" />
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full animate-fade-in">
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularDishes.map((dish, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{dish.name}</span>
                        <span className="text-xs text-gray-500">
                          {dish.orders} orders
                        </span>
                      </div>
                      <Progress value={dish.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <OrdersTable orders={recentOrders} title="Today's Orders" />
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {recentReviews.map((review) => (
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
                              <h4 className="font-medium">{review.customer}</h4>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerOverview;
