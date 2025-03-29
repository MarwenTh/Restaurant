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

const data = [
  { name: "Jan", sales: 4000, orders: 240, customers: 140 },
  { name: "Feb", sales: 3000, orders: 198, customers: 120 },
  { name: "Mar", sales: 5000, orders: 300, customers: 180 },
  { name: "Apr", sales: 2780, orders: 208, customers: 130 },
  { name: "May", sales: 1890, orders: 160, customers: 90 },
  { name: "Jun", sales: 2390, orders: 230, customers: 140 },
  { name: "Jul", sales: 3490, orders: 330, customers: 200 },
  { name: "Aug", sales: 3120, orders: 250, customers: 170 },
  { name: "Sep", sales: 2490, orders: 210, customers: 150 },
  { name: "Oct", sales: 2980, orders: 265, customers: 155 },
  { name: "Nov", sales: 3540, orders: 290, customers: 180 },
  { name: "Dec", sales: 4120, orders: 360, customers: 220 },
];

interface OverviewChartProps {
  title?: string;
  description?: string;
}

const OverviewChart: React.FC<OverviewChartProps> = ({
  title = "Revenue Overview",
  description = "Summary of sales and orders performance over time",
}) => {
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

          <TabsContent value="area" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
                  <Bar dataKey="sales" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
