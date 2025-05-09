"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import useAnalyticsOverview from "@/hooks/useAnalyticsOverview";
import useOrderAnalytics from "@/hooks/useOrderAnalytics";
import useRevenueAnalytics from "@/hooks/useRevenueAnalytics";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

// Modern color palette inspired by Dribbble
const COLORS = {
  primary: "#6366F1", // Indigo
  secondary: "#10B981", // Emerald
  accent: "#F59E0B", // Amber
  danger: "#EF4444", // Red
  success: "#22C55E", // Green
  warning: "#F97316", // Orange
  info: "#3B82F6", // Blue
  chart: {
    bar: "#6366F1",
    line: "#10B981",
    pie: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#22C55E"],
  },
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const SellerAnalytics: React.FC = () => {
  const {
    totalOrders,
    orderPercentageChange,
    totalSales,
    salesPercentageChange,
    uniqueCustomers,
    customerPercentageChange,
    averageRating,
    ratingChange,
    loading: overviewLoading,
  } = useAnalyticsOverview();

  const {
    dailyOrders,
    statusDistribution,
    averageOrderValue,
    hourlyOrders,
    loading: ordersLoading,
  } = useOrderAnalytics();

  const {
    dailyRevenue,
    totalRevenue,
    revenuePercentageChange,
    revenueByPaymentMethod,
    revenueByTimeOfDay,
    loading: revenueLoading,
  } = useRevenueAnalytics();

  const renderSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-[300px] w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );

  if (overviewLoading || ordersLoading || revenueLoading) {
    return renderSkeleton();
  }

  const statusData = Object.entries(statusDistribution).map(
    ([status, count]) => ({
      name: status,
      value: count,
    }),
  );

  const paymentMethodData = Object.entries(revenueByPaymentMethod).map(
    ([method, amount]) => ({
      name: method,
      value: amount,
    }),
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
          <Card
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950
              dark:to-indigo-900"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                {totalOrders}
              </div>
              <p
                className={`text-xs
                  ${orderPercentageChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {orderPercentageChange >= 0 ? "+" : ""}
                {orderPercentageChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
          <Card
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950
              dark:to-emerald-900"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {formatCurrency(totalRevenue)}
              </div>
              <p
                className={`text-xs
                  ${revenuePercentageChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {revenuePercentageChange >= 0 ? "+" : ""}
                {revenuePercentageChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
          <Card
            className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950
              dark:to-amber-900"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Unique Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {uniqueCustomers}
              </div>
              <p
                className={`text-xs
                  ${customerPercentageChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {customerPercentageChange >= 0 ? "+" : ""}
                {customerPercentageChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {averageRating.toFixed(1)}
              </div>
              <p
                className={`text-xs
                  ${ratingChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {ratingChange >= 0 ? "+" : ""}
                {ratingChange.toFixed(1)} from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeIn} transition={{ delay: 0.5 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Daily Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyOrders}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString("en-US", {
                          day: "numeric",
                        })
                      }
                      stroke="#6B7280"
                    />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <Bar
                      dataKey="orders"
                      fill={COLORS.chart.bar}
                      radius={[4, 4, 0, 0]}
                      animationDuration={2000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.6 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Daily Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyRevenue}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString("en-US", {
                          day: "numeric",
                        })
                      }
                      stroke="#6B7280"
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      stroke="#6B7280"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={COLORS.chart.line}
                      strokeWidth={2}
                      dot={{ fill: COLORS.chart.line, strokeWidth: 2 }}
                      animationDuration={2000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.7 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Order Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={2000}
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS.chart.pie[index % COLORS.chart.pie.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.8 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Revenue by Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={2000}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS.chart.pie[index % COLORS.chart.pie.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 0.9 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Peak Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyOrders}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(hour) => `${hour}:00`}
                      stroke="#6B7280"
                    />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill={COLORS.chart.bar}
                      radius={[4, 4, 0, 0]}
                      animationDuration={2000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} transition={{ delay: 1 }}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Revenue by Time of Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByTimeOfDay}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(hour) => `${hour}:00`}
                      stroke="#6B7280"
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      stroke="#6B7280"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar
                      dataKey="revenue"
                      fill={COLORS.chart.line}
                      radius={[4, 4, 0, 0]}
                      animationDuration={2000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SellerAnalytics;
