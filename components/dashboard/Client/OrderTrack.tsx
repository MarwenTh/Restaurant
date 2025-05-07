"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  Store,
  ChevronRight,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar,
  CreditCard as CreditCardIcon,
  Info,
  AlertCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/interface";
import Swal from "sweetalert2";

const OrderTrack = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/clientOrders?client=${user._id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch orders");
        }

        setOrders(data.orders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id]);

  const toggleOrder = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in-delivery":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "ready":
        return "bg-purple-100 text-purple-800";
      case "confirmed":
        return "bg-indigo-100 text-indigo-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      color: "#000",
    });

    if (result.isConfirmed) {
      try {
        setDeletingOrderId(orderId);
        const response = await fetch(`/api/clientOrders/${orderId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete order");
        }

        setOrders(orders.filter((order) => order._id !== orderId));

        Swal.fire({
          title: "Deleted!",
          text: "Your order has been deleted.",
          icon: "success",
          background: "#fff",
          color: "#000",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err instanceof Error ? err.message : "Failed to delete order",
          icon: "error",
          background: "#fff",
          color: "#000",
        });
      } finally {
        setDeletingOrderId(null);
      }
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <Package className="h-12 w-12 text-gray-400" />
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Your Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {orders.map((order) => {
              const isExpanded = expandedOrders.has(order._id);
              const isDeleting = deletingOrderId === order._id;
              const currentStatusIndex = [
                "pending",
                "confirmed",
                "preparing",
                "ready",
                "in-delivery",
                "delivered",
                "cancelled",
              ].indexOf(order.status);

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Order Summary */}
                  <motion.div
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleOrder(order._id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Store className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Order #{order._id.slice(-6)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} •{" "}
                            {order.deliveryType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                            ${getPaymentStatusColor(order.paymentStatus)}`}
                          >
                            {order.paymentStatus.charAt(0).toUpperCase() +
                              order.paymentStatus.slice(1)}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Order Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-50 border-t">
                          {/* Status Timeline */}
                          <div className="mb-6">
                            <div className="relative">
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                              <div className="space-y-8">
                                {[
                                  "pending",
                                  "confirmed",
                                  "preparing",
                                  "ready",
                                  "in-delivery",
                                  "delivered",
                                  "cancelled",
                                ].map((status, index) => {
                                  const isCompleted =
                                    index < currentStatusIndex;
                                  const isCurrent =
                                    index === currentStatusIndex;
                                  const Icon =
                                    status === "delivered"
                                      ? CheckCircle2
                                      : status === "in-delivery"
                                        ? Truck
                                        : status === "preparing"
                                          ? Clock
                                          : status === "ready"
                                            ? CheckCircle2
                                            : status === "confirmed"
                                              ? CheckCircle2
                                              : status === "cancelled"
                                                ? XCircle
                                                : Package;

                                  return (
                                    <motion.div
                                      key={status}
                                      className="relative flex items-start"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                    >
                                      <div
                                        className={`absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full flex items-center
                                        justify-center ${
                                        isCompleted
                                            ? "bg-green-100 text-green-600"
                                            : isCurrent
                                              ? "bg-orange-100 text-orange-600"
                                              : "bg-gray-100 text-gray-400"
                                        }`}
                                      >
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div className="ml-12">
                                        <p
                                          className={`font-medium ${
                                          isCompleted
                                              ? "text-green-600"
                                              : isCurrent
                                                ? "text-orange-600"
                                                : "text-gray-400"
                                          }`}
                                        >
                                          {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                        </p>
                                        {isCurrent && (
                                          <p className="text-sm text-gray-500 mt-1">
                                            {order.status === "delivered" &&
                                            order.actualDeliveryTime
                                              ? `Delivered at ${new Date(order.actualDeliveryTime).toLocaleTimeString()}`
                                              : order.status === "cancelled"
                                                ? "Order cancelled"
                                                : "In progress"}
                                          </p>
                                        )}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Order Details Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Order Information */}
                            <Card>
                              <CardHeader className="border-b">
                                <CardTitle className="text-lg font-semibold">
                                  Order Information
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-gray-900">
                                        Order Date
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {new Date(
                                          order.createdAt,
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                      <CreditCardIcon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-gray-900">
                                        Payment Status
                                      </h3>
                                      <p className="text-sm text-gray-500">
                                        {order.paymentStatus
                                          .charAt(0)
                                          .toUpperCase() +
                                          order.paymentStatus.slice(1)}
                                      </p>
                                    </div>
                                  </div>
                                  {order.scheduledFor && (
                                    <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-green-100 rounded-lg">
                                        <Clock className="h-5 w-5 text-green-600" />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-gray-900">
                                          Scheduled For
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          {new Date(
                                            order.scheduledFor,
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {order.specialInstructions && (
                                    <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-orange-100 rounded-lg">
                                        <Info className="h-5 w-5 text-orange-600" />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-gray-900">
                                          Special Instructions
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          {order.specialInstructions}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Delivery/Pickup Information */}
                            {order.deliveryType === "delivery" ? (
                              <Card>
                                <CardHeader className="border-b">
                                  <CardTitle className="text-lg font-semibold">
                                    Delivery Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                  <div className="space-y-4">
                                    {order.deliveryAddress && (
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                          <MapPin className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-gray-900">
                                            Delivery Address
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                            {order.deliveryAddress.street},{" "}
                                            {order.deliveryAddress.city},{" "}
                                            {order.deliveryAddress.state}{" "}
                                            {order.deliveryAddress.zipCode}
                                            {order.deliveryAddress
                                              .specialInstructions && (
                                              <span className="block mt-1 text-gray-400">
                                                {
                                                  order.deliveryAddress
                                                    .specialInstructions
                                                }
                                              </span>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    {order.estimatedDeliveryTime && (
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                          <Clock className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-gray-900">
                                            Estimated Delivery
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                            {new Date(
                                              order.estimatedDeliveryTime,
                                            ).toLocaleTimeString()}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    {order.deliveryFee && (
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                          <Truck className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-gray-900">
                                            Delivery Fee
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                            {formatCurrency(order.deliveryFee)}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                    {order.tip && (
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                          <CreditCardIcon className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-gray-900">
                                            Tip
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                            {formatCurrency(order.tip)}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ) : order.deliveryType === "pickup" ? (
                              <Card>
                                <CardHeader className="border-b">
                                  <CardTitle className="text-lg font-semibold">
                                    Pickup Information
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="p-2 bg-orange-100 rounded-lg">
                                        <Store className="h-5 w-5 text-orange-600" />
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-gray-900">
                                          Pickup Location
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                          This order is for pickup at the
                                          restaurant.
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ) : null}
                          </div>

                          {/* Order Items */}
                          <Card className="mt-6">
                            <CardHeader className="border-b">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">
                                  Order Items
                                </CardTitle>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteOrder(order._id);
                                  }}
                                  disabled={isDeleting}
                                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-red-600
                                    hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50
                                    disabled:cursor-not-allowed"
                                >
                                  {isDeleting ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      <span>Deleting...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4" />
                                      <span>Delete Order</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-0">
                              <div className="divide-y">
                                {order.items.map((item, index) => (
                                  <motion.div
                                    key={index}
                                    className="p-6 hover:bg-gray-50 transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                          <span className="text-sm font-medium text-gray-600">
                                            x{item.quantity}
                                          </span>
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-gray-900">
                                            {item.menuItem.name}
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                            {formatCurrency(item.unitPrice)}{" "}
                                            each
                                            {item.specialInstructions && (
                                              <span className="block text-gray-400">
                                                {item.specialInstructions}
                                              </span>
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="font-medium text-gray-900">
                                        {formatCurrency(
                                          item.unitPrice * item.quantity,
                                        )}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                                <div className="p-6 border-t bg-gray-50">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-gray-900">
                                        Subtotal
                                      </span>
                                      <span className="text-gray-900">
                                        {formatCurrency(
                                          order.totalAmount -
                                            (order.deliveryFee || 0) -
                                            (order.tip || 0),
                                        )}
                                      </span>
                                    </div>
                                    {order.deliveryFee && (
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">
                                          Delivery Fee
                                        </span>
                                        <span className="text-gray-900">
                                          {formatCurrency(order.deliveryFee)}
                                        </span>
                                      </div>
                                    )}
                                    {order.tip && (
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">
                                          Tip
                                        </span>
                                        <span className="text-gray-900">
                                          {formatCurrency(order.tip)}
                                        </span>
                                      </div>
                                    )}
                                    {order.discountAmount && (
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900">
                                          Discount
                                        </span>
                                        <span className="text-green-600">
                                          -
                                          {formatCurrency(order.discountAmount)}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center justify-between pt-2 border-t">
                                      <span className="font-medium text-gray-900">
                                        Total Amount
                                      </span>
                                      <span className="text-xl font-bold text-gray-900">
                                        {formatCurrency(order.totalAmount)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTrack;
