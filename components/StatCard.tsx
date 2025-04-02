import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentageChange?: number;
  color?: "orange" | "red" | "green" | "blue" | "yellow";
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  percentageChange,
  color = "orange",
  delay = 0,
}) => {
  const colorClasses = {
    orange: "bg-orange-100 text-food-orange",
    red: "bg-red-100 text-food-red",
    green: "bg-green-100 text-food-green",
    blue: "bg-blue-100 text-food-blue",
    yellow: "bg-yellow-100 text-food-yellow",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="stat-card"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>

          {percentageChange !== undefined && (
            <div className="flex items-center mt-2">
              {percentageChange >= 0 ? (
                <>
                  <ArrowUp className="text-food-green" size={16} />
                  <span className="text-xs font-medium text-food-green ml-1">
                    {percentageChange}%
                  </span>
                </>
              ) : (
                <>
                  <ArrowDown className="text-food-red" size={16} />
                  <span className="text-xs font-medium text-food-red ml-1">
                    {Math.abs(percentageChange)}%
                  </span>
                </>
              )}
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
