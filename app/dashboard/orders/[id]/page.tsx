"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  X,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  AlertCircle,
  ChevronRight,
  Calendar,
  MapPin,
  User,
  CreditCard,
  TruckIcon,
  RefreshCw,
  Check,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

// Define the API order interface to match the backend model
interface ApiOrder {
  _id: string;
  client: {
    _id: string;
    name: string;
    email: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    menuItem: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    unitPrice: number;
    specialInstructions?: string;
  }[];
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "in-delivery"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  deliveryFee?: number;
  tip?: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    specialInstructions?: string;
  };
  deliveryType?: "delivery" | "pickup" | "dine-in";
  scheduledFor?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  driver?: {
    _id: string;
    name: string;
    email: string;
  };
  refundInfo?: {
    amount: number;
    reason: string;
    date: string;
  };
  promoCodeApplied?: string;
  discountAmount?: number;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  preparing: "bg-purple-100 text-purple-800 border-purple-200",
  ready: "bg-indigo-100 text-indigo-800 border-indigo-200",
  "in-delivery": "bg-cyan-100 text-cyan-800 border-cyan-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  pending: <Clock className="h-5 w-5" />,
  confirmed: <CheckCircle2 className="h-5 w-5" />,
  preparing: <Package className="h-5 w-5" />,
  ready: <CheckCircle2 className="h-5 w-5" />,
  "in-delivery": <Truck className="h-5 w-5" />,
  delivered: <CheckCircle2 className="h-5 w-5" />,
  cancelled: <AlertCircle className="h-5 w-5" />,
};

const statusSteps = [
  { status: "pending", label: "Order Placed" },
  { status: "confirmed", label: "Order Confirmed" },
  { status: "preparing", label: "Preparing" },
  { status: "ready", label: "Ready for Pickup" },
  { status: "in-delivery", label: "Out for Delivery" },
  { status: "delivered", label: "Delivered" },
];

const paymentStatusColors = {
  pending: "bg-yellow-100 text-[#FFE66D] border-[#FFE66D]",
  paid: "bg-green-100 text-[#28C76F] border-[#28C76F]",
  failed: "bg-red-100 text-[#EA5455] border-[#EA5455]",
  refunded: "bg-blue-100 text-[#00CFE8] border-[#00CFE8]",
};

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<ApiOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/order/${params.id}`);

      if (!response.ok) {
        throw new Error(`Error fetching order: ${response.statusText}`);
      }

      const data = await response.json();
      setOrder(data.order);
      setError(null);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch order details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: ApiOrder["status"]) => {
    if (!order) return;

    try {
      setUpdating(true);
      const response = await axios.put(`/api/order/${order._id}`, {
        status: newStatus,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update order status");
      }
      setOrder(response.data.order);
      toast.success("Order status updated successfully");
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const handleBack = () => {
    router.back();
  };

  const getCurrentStepIndex = () => {
    if (!order) return -1;
    return statusSteps.findIndex((step) => step.status === order.status);
  };

  const formatStatus = (status?: string) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="outline"
          onClick={handleBack}
          className="hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <Button
          variant="outline"
          onClick={fetchOrderDetails}
          className="hover:bg-gray-100 transition-colors"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center min-h-[400px]"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center min-h-[400px]"
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-red-100">
                <X className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Error</h3>
              <p className="text-gray-600">{error}</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : order ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Order Status Timeline */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="relative">
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2" />
                  <div className="relative flex justify-between">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= getCurrentStepIndex();
                      const isCurrent = index === getCurrentStepIndex();
                      return (
                        <motion.div
                          key={step.status}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isCurrent
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                          >
                            {isCompleted ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              statusIcons[
                                step.status as keyof typeof statusIcons
                              ]
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${isCurrent ? "text-blue-500" : "text-gray-500"}`}
                          >
                            {step.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-2 space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">#{order._id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Status</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${statusColors[order.status]} border flex items-center gap-1`}
                          >
                            {statusIcons[order.status]}
                            <span>{formatStatus(order.status)}</span>
                          </Badge>
                          <Select
                            value={order.status}
                            onValueChange={handleStatusUpdate}
                            disabled={updating}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(statusColors).map((status) => (
                                <SelectItem key={status} value={status}>
                                  <div className="flex items-center gap-2">
                                    {
                                      statusIcons[
                                        status as keyof typeof statusIcons
                                      ]
                                    }
                                    <span>{formatStatus(status)}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <Badge
                          variant="outline"
                          className={`${paymentStatusColors[order.paymentStatus]} border`}
                        >
                          {order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center border-b pb-4"
                        >
                          <div>
                            <p className="font-medium">{item.menuItem.name}</p>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity} ×{" "}
                              {formatCurrency(item.unitPrice)}
                            </p>
                            {item.specialInstructions && (
                              <p className="text-sm text-gray-500 mt-1">
                                Note: {item.specialInstructions}
                              </p>
                            )}
                          </div>
                          <p className="font-medium">
                            {formatCurrency(item.quantity * item.unitPrice)}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>
                          {formatCurrency(
                            order.totalAmount -
                              (order.deliveryFee || 0) -
                              (order.tip || 0),
                          )}
                        </p>
                      </div>
                      {order.deliveryFee && (
                        <div className="flex justify-between">
                          <p>Delivery Fee</p>
                          <p>{formatCurrency(order.deliveryFee)}</p>
                        </div>
                      )}
                      {order.tip && (
                        <div className="flex justify-between">
                          <p>Tip</p>
                          <p>{formatCurrency(order.tip)}</p>
                        </div>
                      )}
                      {order.discountAmount && order.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <p>Discount</p>
                          <p>-{formatCurrency(order.discountAmount)}</p>
                        </div>
                      )}
                      <div className="flex justify-between font-bold border-t pt-2 mt-2">
                        <p>Total</p>
                        <p>{formatCurrency(order.totalAmount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">
                          {order.client.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{order.client.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {order.deliveryAddress && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>{order.deliveryAddress.street}</p>
                        <p>
                          {order.deliveryAddress.city},{" "}
                          {order.deliveryAddress.state}{" "}
                          {order.deliveryAddress.zipCode}
                        </p>
                        <p>{order.deliveryAddress.country}</p>
                        {order.deliveryAddress.specialInstructions && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Special Instructions
                            </p>
                            <p>{order.deliveryAddress.specialInstructions}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {order.driver && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TruckIcon className="h-5 w-5" />
                        Driver Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">
                            {order.driver.name || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{order.driver.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {order.refundInfo && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Refund Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">
                            {formatCurrency(order.refundInfo.amount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Reason</p>
                          <p>{order.refundInfo.reason}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p>{formatDate(order.refundInfo.date)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center min-h-[400px]"
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="mb-4 p-4 rounded-full bg-gray-100">
                <AlertCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
              <p className="text-gray-600">
                The requested order could not be found.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
