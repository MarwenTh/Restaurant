"use client";

import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import useChartData from "@/hooks/useChartData";

interface OverviewChartProps {
  title?: string;
  description?: string;
}

const ChartSkeleton = () => (
  <div className="h-[300px] mt-4 space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-48" />
    </div>
    <Skeleton className="h-[250px] w-full" />
  </div>
);

const OverviewChart: React.FC<OverviewChartProps> = ({
  title = "Revenue Overview",
  description = "Summary of sales and orders performance over time",
}) => {
  const { data, loading, error, retry } = useChartData();

  if (error) {
    return (
      <Card className="card-shadow w-full">
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 space-y-4">
            <div className="text-red-500">
              Error loading chart data: {error}
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow w-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="area">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span>Sales</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>

          {loading ? (
            <ChartSkeleton />
          ) : (
            <>
              <TabsContent value="area" className="mt-0">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorSales"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorOrders"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #f0f0f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#6366F1"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="line" className="mt-0">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #f0f0f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 2 }}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 2 }}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="bar" className="mt-0">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          border: "1px solid #f0f0f0",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        }}
                      />
                      <Bar
                        dataKey="sales"
                        fill="#6366F1"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="orders"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
