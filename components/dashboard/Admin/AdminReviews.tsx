"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageSquare,
  Filter,
  Download,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// Sample data for reviews
const restaurantReviews = [
  {
    id: "1",
    restaurantName: "Mario's Italian",
    customerName: "Sarah Johnson",
    rating: 5,
    comment: "Best pasta I've ever had! The service was also impeccable.",
    date: "2023-07-15",
    status: "published",
  },
  {
    id: "2",
    restaurantName: "Taco Heaven",
    customerName: "Mike Rodriguez",
    rating: 4,
    comment: "Authentic Mexican flavors. The tacos al pastor were delicious.",
    date: "2023-07-14",
    status: "published",
  },
  {
    id: "3",
    restaurantName: "Burger Joint",
    customerName: "Chris Wilson",
    rating: 2,
    comment:
      "Burger was overcooked and fries were cold. Disappointing experience.",
    date: "2023-07-13",
    status: "flagged",
  },
  {
    id: "4",
    restaurantName: "Sushi Master",
    customerName: "Emily Chen",
    rating: 5,
    comment:
      "Fresh ingredients and beautiful presentation. Will definitely be back!",
    date: "2023-07-12",
    status: "published",
  },
  {
    id: "5",
    restaurantName: "Pizza Palace",
    customerName: "Daniel Adams",
    rating: 3,
    comment: "Average pizza, nothing special. Delivery was quick though.",
    date: "2023-07-11",
    status: "published",
  },
  {
    id: "6",
    restaurantName: "Chinese Wok",
    customerName: "Lisa Wang",
    rating: 1,
    comment: "Food was cold on arrival and missing items. Very disappointed.",
    date: "2023-07-10",
    status: "flagged",
  },
  {
    id: "7",
    restaurantName: "Mario's Italian",
    customerName: "Robert Taylor",
    rating: 4,
    comment: "Great food but service was a bit slow. Would still recommend.",
    date: "2023-07-09",
    status: "published",
  },
  {
    id: "8",
    restaurantName: "Taco Heaven",
    customerName: "Jessica Perez",
    rating: 5,
    comment: "Their vegetarian options are amazing! Best Mexican food in town.",
    date: "2023-07-08",
    status: "published",
  },
];

// Review card component
const ReviewCard = ({ review }: { review: (typeof restaurantReviews)[0] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            <h3 className="font-semibold text-lg">{review.restaurantName}</h3>
            <p className="text-sm text-muted-foreground">
              {review.customerName}
            </p>
          </div>
          <Badge className={getStatusColor(review.status)} variant="outline">
            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center mb-2 space-x-1">
          {renderStars(review.rating)}
          <span className="text-sm ml-2 text-muted-foreground">
            {new Date(review.date).toLocaleDateString()}
          </span>
        </div>

        <p className="text-sm mb-4">{review.comment}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
const AdminReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter reviews based on active tab
  const filteredReviews =
    activeTab === "all"
      ? restaurantReviews
      : activeTab === "flagged"
        ? restaurantReviews.filter((review) => review.status === "flagged")
        : restaurantReviews.filter((review) => review.rating <= 3);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-2xl font-bold">Review Management</h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
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
                    <TabsTrigger value="flagged">Flagged</TabsTrigger>
                    <TabsTrigger value="negative">Negative</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="flagged" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="negative" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
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
