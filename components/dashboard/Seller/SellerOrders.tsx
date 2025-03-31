"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Search,
  Filter,
  Clock,
  Check,
  X,
  ArrowRight,
  Calendar,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import { Order } from "./OrdersTable";

const orders: (Order & { status: keyof typeof statusColors })[] = [
  {
    id: "1234",
    customer: "John Doe",
    items: "Pasta Carbonara x2",
    total: 42.99,
    status: "pending",
    date: "2023-07-15",
  },
  {
    id: "1235",
    customer: "Jane Smith",
    items: "Margherita Pizza, Tiramisu",
    total: 32.5,
    status: "processing",
    date: "2023-07-15",
  },
  {
    id: "1236",
    customer: "David Johnson",
    items: "Chicken Tacos x3",
    total: 28.75,
    status: "pending",
    date: "2023-07-15",
  },
  {
    id: "1237",
    customer: "Sarah Williams",
    items: "Sushi Combo",
    total: 45.0,
    status: "completed",
    date: "2023-07-14",
  },
  {
    id: "1238",
    customer: "Michael Brown",
    items: "Burger, Fries, Coke",
    total: 22.5,
    status: "cancelled",
    date: "2023-07-14",
  },
  {
    id: "1239",
    customer: "Emily Davis",
    items: "Caesar Salad, Garlic Bread",
    total: 18.99,
    status: "completed",
    date: "2023-07-14",
  },
  {
    id: "1240",
    customer: "Robert Wilson",
    items: "Steak, Mashed Potatoes",
    total: 38.75,
    status: "processing",
    date: "2023-07-13",
  },
  {
    id: "1241",
    customer: "Jennifer Garcia",
    items: "Fish Tacos x2, Guacamole",
    total: 27.5,
    status: "completed",
    date: "2023-07-13",
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-[#FFE66D] border-[#FFE66D]",
  processing: "bg-blue-100 text-[#00CFE8] border-[#00CFE8]",
  completed: "bg-green-100 text-[#28C76F] border-[#28C76F]",
  cancelled: "bg-red-100 text-[#EA5455] border-[#EA5455]",
};

const SellerOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pendingOrders = filteredOrders.filter(
    (order) => order.status === "pending",
  );
  const processingOrders = filteredOrders.filter(
    (order) => order.status === "processing",
  );
  const completedOrders = filteredOrders.filter(
    (order) => order.status === "completed",
  );
  const cancelledOrders = filteredOrders.filter(
    (order) => order.status === "cancelled",
  );

  return (
    <div>
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-md
              hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">
                    Pending
                  </p>
                  <h3 className="text-2xl font-bold text-yellow-900">
                    {pendingOrders.length}
                  </h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-green-600" size={14} />
                    <span className="text-xs font-medium text-green-600 ml-1">
                      {Math.round((pendingOrders.length / orders.length) * 100)}
                      %
                    </span>
                    <span className="text-xs text-gray-500 ml-1">of total</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-inner">
                  <Clock className="text-yellow-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md
              hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Processing
                  </p>
                  <h3 className="text-2xl font-bold text-blue-900">
                    {processingOrders.length}
                  </h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-green-600" size={14} />
                    <span className="text-xs font-medium text-green-600 ml-1">
                      {Math.round(
                        (processingOrders.length / orders.length) * 100,
                      )}
                      %
                    </span>
                    <span className="text-xs text-gray-500 ml-1">of total</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 shadow-inner">
                  <ArrowRight className="text-blue-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md
              hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">
                    Completed
                  </p>
                  <h3 className="text-2xl font-bold text-green-900">
                    {completedOrders.length}
                  </h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-green-600" size={14} />
                    <span className="text-xs font-medium text-green-600 ml-1">
                      {Math.round(
                        (completedOrders.length / orders.length) * 100,
                      )}
                      %
                    </span>
                    <span className="text-xs text-gray-500 ml-1">of total</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-green-200 to-green-300 shadow-inner">
                  <Check className="text-green-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-md
              hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">
                    Cancelled
                  </p>
                  <h3 className="text-2xl font-bold text-red-900">
                    {cancelledOrders.length}
                  </h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="text-red-600" size={14} />
                    <span className="text-xs font-medium text-red-600 ml-1">
                      {Math.round(
                        (cancelledOrders.length / orders.length) * 100,
                      )}
                      %
                    </span>
                    <span className="text-xs text-gray-500 ml-1">of total</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-br from-red-200 to-red-300 shadow-inner">
                  <X className="text-red-700" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative mx-1 w-full">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Search orders..."
                    className="pl-10 w-96"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <OrdersTabContent value="all" orders={filteredOrders} />
            <OrdersTabContent value="pending" orders={pendingOrders} />
            <OrdersTabContent value="processing" orders={processingOrders} />
            <OrdersTabContent value="completed" orders={completedOrders} />
            <OrdersTabContent value="cancelled" orders={cancelledOrders} />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface OrdersTabContentProps {
  value: string;
  orders: Order[];
}

const OrdersTabContent: React.FC<OrdersTabContentProps> = ({
  value,
  orders,
}) => {
  return (
    <TabsContent value={value} className="mt-0">
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusColors[order.status as keyof typeof statusColors]} border`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SellerOrders;
