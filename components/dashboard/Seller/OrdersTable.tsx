import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

interface OrdersTableProps {
  orders: Order[];
  title?: string;
  onViewOrder?: (id: string) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-[#FFE66D] border-[#FFE66D]",
  processing: "bg-blue-100 text-[#00CFE8] border-[#00CFE8]",
  completed: "bg-green-100 text-[#28C76F] border-[#28C76F]",
  cancelled: "bg-red-100 text-[#EA5455] border-[#EA5455]",
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  title = "Recent Orders",
  onViewOrder,
}) => {
  const navigate = useRouter();

  const handleViewOrder = (orderId: string) => {
    if (onViewOrder) {
      onViewOrder(orderId);
    } else {
      // Default behavior - navigate to order details
      navigate.push(`/seller/orders/${orderId}`);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewOrder(order.id)}
                >
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${statusColors[order.status]} border`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <Eye size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
