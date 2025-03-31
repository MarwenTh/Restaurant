"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Download,
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  Star,
  MapPin,
} from "lucide-react";

// Sample data for charts
const monthlySales = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 4000 },
  { name: "Sep", sales: 3000 },
  { name: "Oct", sales: 2000 },
  { name: "Nov", sales: 2780 },
  { name: "Dec", sales: 3890 },
];

const dailyOrders = [
  { name: "Mon", orders: 24 },
  { name: "Tue", orders: 32 },
  { name: "Wed", orders: 28 },
  { name: "Thu", orders: 38 },
  { name: "Fri", orders: 52 },
  { name: "Sat", orders: 64 },
  { name: "Sun", orders: 48 },
];

const categoryDistribution = [
  { name: "Pizza", value: 35 },
  { name: "Pasta", value: 25 },
  { name: "Desserts", value: 15 },
  { name: "Appetizers", value: 15 },
  { name: "Beverages", value: 10 },
];

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF0000"];

const hourlyActivity = [
  { hour: "12am", customers: 5 },
  { hour: "1am", customers: 3 },
  { hour: "2am", customers: 2 },
  { hour: "3am", customers: 0 },
  { hour: "4am", customers: 0 },
  { hour: "5am", customers: 0 },
  { hour: "6am", customers: 2 },
  { hour: "7am", customers: 5 },
  { hour: "8am", customers: 8 },
  { hour: "9am", customers: 12 },
  { hour: "10am", customers: 15 },
  { hour: "11am", customers: 28 },
  { hour: "12pm", customers: 35 },
  { hour: "1pm", customers: 38 },
  { hour: "2pm", customers: 25 },
  { hour: "3pm", customers: 20 },
  { hour: "4pm", customers: 18 },
  { hour: "5pm", customers: 22 },
  { hour: "6pm", customers: 35 },
  { hour: "7pm", customers: 42 },
  { hour: "8pm", customers: 38 },
  { hour: "9pm", customers: 30 },
  { hour: "10pm", customers: 22 },
  { hour: "11pm", customers: 12 },
];

const customerDemographics = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 30 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 15 },
];

const locationData = [
  { name: "Downtown", value: 35 },
  { name: "Uptown", value: 25 },
  { name: "Midtown", value: 20 },
  { name: "Suburbs", value: 15 },
  { name: "Other", value: 5 },
];

const topItems = [
  { name: "Margherita Pizza", orders: 120, rating: 4.8 },
  { name: "Pasta Carbonara", orders: 95, rating: 4.7 },
  { name: "Tiramisu", orders: 85, rating: 4.9 },
  { name: "Garlic Bread", orders: 75, rating: 4.5 },
  { name: "Caesar Salad", orders: 60, rating: 4.6 },
];

const SellerAnalytics: React.FC = () => {
  return (
    <div>
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-[#FF9F43]/20 to-[#FF9F43]/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Orders
                  </p>
                  <h3 className="text-2xl font-bold">1,245</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +15.8% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-[#FF9F43]/30">
                  <ShoppingCart className="text-[#FF9F43]" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Sales
                  </p>
                  <h3 className="text-2xl font-bold">$23,456</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +8.2% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-200">
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-100 to-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Customers
                  </p>
                  <h3 className="text-2xl font-bold">842</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +12.5% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-200">
                  <Users className="text-green-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Average Rating
                  </p>
                  <h3 className="text-2xl font-bold">4.8/5</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +0.2 from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-200">
                  <Star className="text-yellow-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales overview</CardDescription>
              </div>
              <Tabs defaultValue="1y">
                <TabsList>
                  <TabsTrigger value="1m">1M</TabsTrigger>
                  <TabsTrigger value="6m">6M</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                    <Bar dataKey="sales" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daily Orders</CardTitle>
                <CardDescription>Orders by day of week</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download size={14} /> Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyOrders}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Sales by food category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Age distribution of customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerDemographics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Locations</CardTitle>
              <CardDescription>Where orders are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {locationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <Button variant="outline" size="sm" className="gap-2">
                  <MapPin size={14} /> View Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Activity</CardTitle>
              <CardDescription>Customer activity by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyActivity}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      opacity={0.2}
                      vertical={false}
                    />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} customers`, "Activity"]}
                    />
                    <Bar
                      dataKey="customers"
                      fill="#22C55E"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Items</CardTitle>
              <CardDescription>Most ordered items and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full bg-[#FF9F43]/20 text-[#FF9F43] flex items-center
                          justify-center font-bold"
                      >
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <ShoppingCart size={12} className="mr-1" />{" "}
                          {item.orders} orders
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
