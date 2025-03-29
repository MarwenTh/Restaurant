"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  trend?: "up" | "down" | "neutral";
  description?: string;
  iconColor?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  trend = "neutral",
  description,
  iconColor = "bg-[#f1f5f9]/10 text-[#f1f5f9]",
}) => {
  return (
    <Card className="overflow-hidden card-shadow card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[#64748b]">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">{value}</h3>

            {change !== undefined && (
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs font-medium ${
                  trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
                >
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}
                  {Math.abs(change)}%
                </span>
                <span className="text-xs text-[#64748b] ml-1">
                  vs last month
                </span>
              </div>
            )}

            {description && (
              <p className="text-xs text-[#64748b] mt-2">{description}</p>
            )}
          </div>

          <div className={`p-2.5 rounded-lg ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
