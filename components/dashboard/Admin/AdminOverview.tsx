"use client";

import React from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  CircleCheck,
  Clock,
  RefreshCw,
} from "lucide-react";
import OverviewChart from "@/components/dashboard/OverviewChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentActivityList from "../RecentlyActivityList";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";
import useAdminMetrics from "@/hooks/useAdminMetrics";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

const AdminOverview = () => {
  const {
    totalOrders,
    orderPercentageChange,
    uniqueCustomers,
    customerPercentageChange,
    loading,
    error,
    retry,
  } = useAdminMetrics();

  const metrics = [
    {
      title: "Total Orders",
      value: loading ? "..." : formatNumber(totalOrders),
      icon: ShoppingBag,
      change: orderPercentageChange,
      trend: orderPercentageChange >= 0 ? ("up" as const) : ("down" as const),
      iconColor: "bg-orange-100 text-orange-600",
    },
    {
      title: "Active Users",
      value: loading ? "..." : formatNumber(uniqueCustomers),
      icon: Users,
      change: customerPercentageChange,
      trend:
        customerPercentageChange >= 0 ? ("up" as const) : ("down" as const),
      iconColor: "bg-green-100 text-green-600",
    },
  ];

  const topSellingItems = [
    { name: "Grilled Salmon", sales: 542, percentage: 85 },
    { name: "Margherita Pizza", sales: 495, percentage: 78 },
    { name: "Beef Tenderloin", sales: 401, percentage: 63 },
    { name: "Tiramisu", sales: 386, percentage: 60 },
    { name: "Caesar Salad", sales: 324, percentage: 51 },
  ];

  // Data for the delivery performance card
  const deliveryPerformance = {
    onTime: 85,
    late: 12,
    cancelled: 3,
  };

  if (error) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-red-500">
          Error loading dashboard data: {error}
        </div>
        <Button
          onClick={retry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {metrics.map((metric, idx) =>
          loading ? (
            <Card key={idx} className="card-shadow">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ) : (
            <StatCard
              key={idx}
              title={metric.title}
              value={metric.value}
              icon={<metric.icon />}
              percentageChange={metric.change}
              color={
                metric.trend === "up"
                  ? "green"
                  : metric.trend === "down"
                    ? "red"
                    : "orange"
              }
              delay={idx}
            />
          ),
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OverviewChart
            title="Revenue & Orders"
            description="Monthly revenue and order statistics"
          />
        </div>
        <div>
          <RecentActivityList />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>
              Most popular menu items this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-[#64748b]">
                      {item.sales} sold
                    </span>
                  </div>
                  <Progress
                    value={item.percentage}
                    className={`h-2 ${
                    index === 0
                        ? "bg-blue-500"
                        : index === 1
                          ? "bg-green-500"
                          : index === 2
                            ? "bg-orange-500"
                            : "bg-accent"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>
              Overview of delivery timing and reliability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-[#f1f5f9] rounded-lg">
                <CircleCheck className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-2xl font-semibold">
                  {deliveryPerformance.onTime}%
                </span>
                <span className="text-xs text-[#64748b] text-center">
                  On Time
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-[#f1f5f9] rounded-lg">
                <Clock className="h-8 w-8 text-amber-500 mb-2" />
                <span className="text-2xl font-semibold">
                  {deliveryPerformance.late}%
                </span>
                <span className="text-xs text-[#64748b] text-center">Late</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-[#f1f5f9] rounded-lg">
                <svg
                  className="h-8 w-8 text-red-500 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <span className="text-2xl font-semibold">
                  {deliveryPerformance.cancelled}%
                </span>
                <span className="text-xs text-[#64748b] text-center">
                  Cancelled
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Delivery Times</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average</span>
                  <span className="text-sm font-medium">28 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fastest</span>
                  <span className="text-sm font-medium">15 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Latest</span>
                  <span className="text-sm font-medium">52 minutes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
