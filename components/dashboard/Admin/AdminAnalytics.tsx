"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Activity,
  TrendingUp,
  Users,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  AreaChart,
} from "lucide-react";
import RevenueChart from "../RevenueChart";
import FoodCategoryChart from "@/components/FoodCategoryChart";

const dailyRevenueData = [
  { name: "Mon", value: 4500, color: "#4f46e5" },
  { name: "Tue", value: 5200, color: "#4f46e5" },
  { name: "Wed", value: 4900, color: "#4f46e5" },
  { name: "Thu", value: 6200, color: "#4f46e5" },
  { name: "Fri", value: 7400, color: "#4f46e5" },
  { name: "Sat", value: 9200, color: "#4f46e5" },
  { name: "Sun", value: 8600, color: "#4f46e5" },
];

const weeklyRevenueData = [
  { name: "Week 1", value: 32000, color: "#4f46e5" },
  { name: "Week 2", value: 28000, color: "#4f46e5" },
  { name: "Week 3", value: 35000, color: "#4f46e5" },
  { name: "Week 4", value: 42000, color: "#4f46e5" },
];

const monthlyRevenueData = [
  { name: "Jan", value: 95000, color: "#4f46e5" },
  { name: "Feb", value: 85000, color: "#4f46e5" },
  { name: "Mar", value: 92000, color: "#4f46e5" },
  { name: "Apr", value: 105000, color: "#4f46e5" },
  { name: "May", value: 120000, color: "#4f46e5" },
  { name: "Jun", value: 135000, color: "#4f46e5" },
];

const userGrowthData = [
  { name: "Jan", value: 250, color: "#4f46e5" },
  { name: "Feb", value: 320, color: "#4f46e5" },
  { name: "Mar", value: 410, color: "#4f46e5" },
  { name: "Apr", value: 490, color: "#4f46e5" },
  { name: "May", value: 580, color: "#4f46e5" },
  { name: "Jun", value: 650, color: "#4f46e5" },
  { name: "Jul", value: 750, color: "#4f46e5" },
];

const orderCountData = [
  { name: "Jan", value: 380, color: "#4f46e5" },
  { name: "Feb", value: 420, color: "#4f46e5" },
  { name: "Mar", value: 510, color: "#4f46e5" },
  { name: "Apr", value: 580, color: "#4f46e5" },
  { name: "May", value: 650, color: "#4f46e5" },
  { name: "Jun", value: 750, color: "#4f46e5" },
  { name: "Jul", value: 880, color: "#4f46e5" },
];

const foodCategoryData = [
  { name: "Italian", value: 400, color: "#4f46e5" },
  { name: "Mexican", value: 300, color: "#0ea5e9" },
  { name: "Chinese", value: 300, color: "#ef4444" },
  { name: "Fast Food", value: 200, color: "#f59e0b" },
  { name: "Healthy", value: 100, color: "#10b981" },
];

interface AnalyticCardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: string;
  icon: React.ReactNode;
  trendColor: string;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  icon,
  trendColor,
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>
            <span className="text-xs text-muted-foreground ml-1">
              {trendValue}
            </span>
          </div>
        </div>
        <div className="p-3 rounded-full bg-primary/10">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

const AdminAnalytics: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Analytics</h1>
              <Tabs defaultValue="30days" className="w-auto">
                <TabsList>
                  <TabsTrigger value="7days">7 days</TabsTrigger>
                  <TabsTrigger value="30days">30 days</TabsTrigger>
                  <TabsTrigger value="3months">3 months</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnalyticCard
                title="Total Revenue"
                value="$135,245.00"
                trend="+12.5%"
                trendValue="vs previous period"
                icon={<TrendingUp className="text-primary" size={24} />}
                trendColor="text-green-600"
              />

              <AnalyticCard
                title="Total Users"
                value="2,543"
                trend="+8.2%"
                trendValue="vs previous period"
                icon={<Users className="text-primary" size={24} />}
                trendColor="text-green-600"
              />

              <AnalyticCard
                title="Total Orders"
                value="4,827"
                trend="+5.3%"
                trendValue="vs previous period"
                icon={<ShoppingBag className="text-primary" size={24} />}
                trendColor="text-green-600"
              />

              <AnalyticCard
                title="Conversion Rate"
                value="3.95%"
                trend="-0.4%"
                trendValue="vs previous period"
                icon={<Activity className="text-primary" size={24} />}
                trendColor="text-red-600"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="daily" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>

                    <TabsContent value="daily" className="mt-0">
                      <RevenueChart
                        data={dailyRevenueData.map(
                          ({ name, value, color }) => ({
                            name,
                            revenue: value,
                            color,
                          }),
                        )}
                        title="Daily Revenue"
                        gradient={{
                          id: "dailyRevenue",
                          startColor: "#4f46e5",
                          stopColor: "#818cf8",
                        }}
                        height={300}
                      />
                    </TabsContent>

                    <TabsContent value="weekly" className="mt-0">
                      <RevenueChart
                        data={weeklyRevenueData}
                        dataKey="value"
                        title="Weekly Revenue"
                        gradient={{
                          id: "weeklyRevenue",
                          startColor: "#4f46e5",
                          stopColor: "#818cf8",
                        }}
                        height={300}
                      />
                    </TabsContent>

                    <TabsContent value="monthly" className="mt-0">
                      <RevenueChart
                        data={monthlyRevenueData}
                        dataKey="value"
                        title="Monthly Revenue"
                        gradient={{
                          id: "monthlyRevenue",
                          startColor: "#4f46e5",
                          stopColor: "#818cf8",
                        }}
                        height={300}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Food Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <FoodCategoryChart data={foodCategoryData} height={300} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart
                    data={userGrowthData}
                    dataKey="value"
                    title=""
                    gradient={{
                      id: "userGrowth",
                      startColor: "#0ea5e9",
                      stopColor: "#7dd3fc",
                    }}
                    height={250}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueChart
                    data={orderCountData}
                    dataKey="value"
                    title=""
                    gradient={{
                      id: "orderCount",
                      startColor: "#f59e0b",
                      stopColor: "#fcd34d",
                    }}
                    height={250}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAnalytics;
