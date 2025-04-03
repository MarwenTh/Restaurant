"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface FoodCategoryChartProps {
  data?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  height?: number;
}

const defaultData = [
  { name: "Italian", value: 400, color: "#4f46e5" },
  { name: "Mexican", value: 300, color: "#0ea5e9" },
  { name: "Chinese", value: 300, color: "#ef4444" },
  { name: "Fast Food", value: 200, color: "#f59e0b" },
  { name: "Healthy", value: 100, color: "#10b981" },
];

const FoodCategoryChart: React.FC<FoodCategoryChartProps> = ({
  data = defaultData,
  height = 300,
}) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Popular Food Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} orders`, "Volume"]}
              contentStyle={{ borderRadius: "8px" }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FoodCategoryChart;
