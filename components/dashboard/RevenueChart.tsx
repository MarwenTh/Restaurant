"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueDataPoint {
  name: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  title?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  title = "Revenue Overview",
}) => {
  const formatValue = (value: number | string): string => {
    if (typeof value === "number") {
      return `$${value.toFixed(2)}`;
    }
    return `$${value}`;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 5,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tickFormatter={(value) => formatValue(value)}
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                formatter={(value: number | string) => [
                  formatValue(value),
                  "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "none",
                  padding: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
