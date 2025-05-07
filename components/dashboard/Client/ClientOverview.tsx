"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  ShoppingCart,
  Star,
  Heart,
  Package,
  CreditCard,
  MapPin,
  User,
  Store,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  items: {
    menuItem: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  status: string;
  createdAt: string;
  seller: {
    name: string;
  };
  totalAmount: number;
}

const ClientOverview = () => {
  const { data: session } = useSession();
  const { user, loading: isUserLoading } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Wait for both session and user data to be available
        if (!session?.user?.email || !user?._id) {
          setLoading(true);
          return;
        }

        const response = await fetch(`/api/clientOrders?client=${user._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, user]);

  console.log(orders);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing",
  ).length;
  const favoriteRestaurants = new Set(orders.map((order) => order.seller.name))
    .size;

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  // Show loading state if either session, user, or orders are loading
  if (loading || isUserLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24 mt-2" />
                <Skeleton className="h-6 w-16 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Favorite Restaurants
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {favoriteRestaurants}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Active Orders
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {activeOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {orders.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No orders found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start ordering to see your history here
                </p>
              </div>
            ) : (
              <>
                {currentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-6 hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col space-y-4">
                      {/* Order Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="p-2 bg-orange-100 rounded-lg group-hover:scale-110 transition-transform
                              duration-300"
                          >
                            <Store className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {order.seller?.name || "Unknown Restaurant"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Order #{order._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-500">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="pl-12 space-y-2">
                        {order.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-gray-700">
                                {item.menuItem?.name || "Unknown Item"}
                              </span>
                              <span className="text-sm text-gray-500">
                                x{item.quantity || 0}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(
                                (item.menuItem?.price || 0) *
                                  (item.quantity || 0),
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span
                            className={`text-sm font-medium ${
                              order.status === "completed"
                                ? "text-green-600"
                                : order.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                              }`}
                          >
                            {order.status?.charAt(0).toUpperCase() +
                              order.status?.slice(1) || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Total:</span>
                          <span className="text-lg font-bold text-gray-900">
                            {order.totalAmount
                              ? formatCurrency(order.totalAmount)
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t">
                    <div className="text-sm text-gray-500">
                      Showing {currentOrders.length} of {orders.length} orders
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Name</p>
                  <p className="font-semibold text-gray-900">
                    {session?.user?.name || "Not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="font-semibold text-gray-900">
                    {session?.user?.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Member Since
                  </p>
                  <p className="font-semibold text-gray-900">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOverview;
