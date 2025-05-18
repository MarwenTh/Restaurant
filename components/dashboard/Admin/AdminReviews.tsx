"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Filter, Download, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

// Sample data for reviews

// Review card component
const ReviewCard = ({
  review,
  onDelete,
}: {
  review: any;
  onDelete: (id: string) => void;
}) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
          }
        />
      ));
  };

  return (
    <Card className="overflow-hidden border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{review.name}</h3>
            <p className="text-sm text-muted-foreground">
              {review.role || "User"}
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800" variant="outline">
            Published
          </Badge>
        </div>
        <div className="flex items-center mb-2 space-x-1">
          {renderStars(review.rating)}
          <span className="text-sm ml-2 text-muted-foreground">
            {review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
        <p className="text-sm mb-4">{review.reviewMessage}</p>
        <div className="flex justify-end items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => onDelete(review._id)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/site-review");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/site-review?id=${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete review");
        setReviews((prev) => prev.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "The review has been deleted.", "success");
      } catch (err: any) {
        Swal.fire("Error", err.message || "Failed to delete review", "error");
      }
    }
  };

  // Filter reviews based on active tab
  const filteredReviews =
    activeTab === "all"
      ? reviews
      : activeTab === "positive"
        ? reviews.filter((review) => review.rating >= 4)
        : reviews.filter((review) => review.rating <= 3);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-2xl font-bold">Review Management</h1>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="all"
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="all">All Reviews</TabsTrigger>
                    <TabsTrigger value="positive">Positive</TabsTrigger>
                    <TabsTrigger value="negative">Negative</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loading ? (
                        <div className="col-span-2 text-center text-[#D4AF37]">
                          Loading...
                        </div>
                      ) : error ? (
                        <div className="col-span-2 text-center text-red-500">
                          {error}
                        </div>
                      ) : filteredReviews.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-400">
                          No reviews found.
                        </div>
                      ) : (
                        filteredReviews.map((review) => (
                          <ReviewCard
                            key={review._id}
                            review={review}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="positive" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loading ? (
                        <div className="col-span-2 text-center text-[#D4AF37]">
                          Loading...
                        </div>
                      ) : error ? (
                        <div className="col-span-2 text-center text-red-500">
                          {error}
                        </div>
                      ) : filteredReviews.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-400">
                          No reviews found.
                        </div>
                      ) : (
                        filteredReviews.map((review) => (
                          <ReviewCard
                            key={review._id}
                            review={review}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="negative" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loading ? (
                        <div className="col-span-2 text-center text-[#D4AF37]">
                          Loading...
                        </div>
                      ) : error ? (
                        <div className="col-span-2 text-center text-red-500">
                          {error}
                        </div>
                      ) : filteredReviews.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-400">
                          No reviews found.
                        </div>
                      ) : (
                        filteredReviews.map((review) => (
                          <ReviewCard
                            key={review._id}
                            review={review}
                            onDelete={handleDelete}
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReviews;
