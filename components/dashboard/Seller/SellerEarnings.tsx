"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Download,
  ArrowUp,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  CreditCard,
  Calendar,
  CircleDollarSign,
} from "lucide-react";

// Sample data for charts
const monthlyRevenue = [
  { name: "Jan", revenue: 1200, expenses: 800, profit: 400 },
  { name: "Feb", revenue: 1800, expenses: 1000, profit: 800 },
  { name: "Mar", revenue: 2400, expenses: 1200, profit: 1200 },
  { name: "Apr", revenue: 2000, expenses: 1100, profit: 900 },
  { name: "May", revenue: 2600, expenses: 1300, profit: 1300 },
  { name: "Jun", revenue: 3000, expenses: 1400, profit: 1600 },
  { name: "Jul", revenue: 3400, expenses: 1600, profit: 1800 },
];

const weeklyRevenue = [
  { name: "Mon", revenue: 320, expenses: 180, profit: 140 },
  { name: "Tue", revenue: 450, expenses: 220, profit: 230 },
  { name: "Wed", revenue: 380, expenses: 200, profit: 180 },
  { name: "Thu", revenue: 410, expenses: 210, profit: 200 },
  { name: "Fri", revenue: 680, expenses: 260, profit: 420 },
  { name: "Sat", revenue: 720, expenses: 280, profit: 440 },
  { name: "Sun", revenue: 550, expenses: 230, profit: 320 },
];

const transactions = [
  {
    id: "1234",
    date: "2023-07-15",
    type: "Order",
    items: "Pasta Carbonara x2",
    amount: 42.99,
    status: "completed",
  },
  {
    id: "1235",
    date: "2023-07-15",
    type: "Order",
    items: "Margherita Pizza, Tiramisu",
    amount: 32.5,
    status: "completed",
  },
  {
    id: "1236",
    date: "2023-07-14",
    type: "Order",
    items: "Chicken Tacos x3",
    amount: 28.75,
    status: "completed",
  },
  {
    id: "1237",
    date: "2023-07-13",
    type: "Order",
    items: "Sushi Combo",
    amount: 45.0,
    status: "completed",
  },
  {
    id: "1238",
    date: "2023-07-12",
    type: "Order",
    items: "Burger, Fries, Coke",
    amount: 22.5,
    status: "completed",
  },
  {
    id: "1239",
    date: "2023-07-10",
    type: "Order",
    items: "Platform Fee",
    amount: -15.25,
    status: "fee",
  },
  {
    id: "1240",
    date: "2023-07-05",
    type: "Order",
    items: "Weekly Payout",
    amount: -120.0,
    status: "payout",
  },
];

const SellerEarnings: React.FC = () => {
  return (
    <div>
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-[#FF9F43]/20 to-[#FF9F43]/10 border-[#FF9F43]/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Earnings
                  </p>
                  <h3 className="text-2xl font-bold">$3,245.87</h3>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="text-[#28C76F]" size={14} />
                    <span className="text-xs font-medium text-[#28C76F] ml-1">
                      12.8%
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-[#FF9F43]/30">
                  <CircleDollarSign className="text-[#FF9F43]" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    This Month
                  </p>
                  <h3 className="text-2xl font-bold">$1,528.40</h3>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="text-[#28C76F]" size={14} />
                    <span className="text-xs font-medium text-[#28C76F] ml-1">
                      8.3%
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-green-200">
                  <Calendar className="text-[#28C76F]" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    This Week
                  </p>
                  <h3 className="text-2xl font-bold">$428.75</h3>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="text-[#28C76F]" size={14} />
                    <span className="text-xs font-medium text-[#28C76F] ml-1">
                      5.2%
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      vs last week
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-200">
                  <Calendar className="text-[#00CFE8]" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Pending Payout
                  </p>
                  <h3 className="text-2xl font-bold">$845.12</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-500">
                      Next payout in 3 days
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-purple-200">
                  <CreditCard className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Weekly Revenue Overview</CardTitle>
                {/* <Tabs defaultValue="weekly">
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  </TabsList>
                </Tabs> */}
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <TabsContent value="weekly" className="mt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={weeklyRevenue}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorWeeklyRevenue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3B82F6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3B82F6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorWeeklyProfit"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#22C55E"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#22C55E"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, ""]} />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            fillOpacity={1}
                            fill="url(#colorWeeklyRevenue)"
                            name="Revenue"
                          />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            stroke="#22C55E"
                            fillOpacity={1}
                            fill="url(#colorWeeklyProfit)"
                            name="Profit"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Food", value: 68 },
                        { name: "Beverages", value: 20 },
                        { name: "Desserts", value: 12 },
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                      <Bar
                        dataKey="value"
                        fill="#F97316"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-4">
                  <div
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-amber-50
                      to-transparent border border-amber-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#FF9F43] rounded-full"></div>
                      <span className="text-sm font-medium">Food Items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">$2,435.20</span>
                      <ChevronUp className="text-[#28C76F]" size={16} />
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50
                      to-transparent border border-blue-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-sm font-medium">Beverages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">$698.40</span>
                      <ChevronDown className="text-[#EA5455]" size={16} />
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50
                      to-transparent border border-purple-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-sm font-medium">Desserts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">$419.04</span>
                      <ChevronUp className="text-[#28C76F]" size={16} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={14} /> Export
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      #{transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      {transaction.status === "fee" ? (
                        <span className="text-yellow-600">Fee</span>
                      ) : transaction.status === "payout" ? (
                        <span className="text-blue-600">Payout</span>
                      ) : (
                        <span className="text-green-600">Sale</span>
                      )}
                    </TableCell>
                    <TableCell>{transaction.items}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span
                        className={
                          transaction.amount < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerEarnings;
