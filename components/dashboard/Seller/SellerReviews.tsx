"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  MessageSquare,
} from "lucide-react";

interface Review {
  id: string;
  customer: string;
  avatar: string;
  rating: number;
  comment: string;
  dish: string;
  date: string;
  replied: boolean;
  reply?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    customer: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment:
      "Absolutely delicious! The pasta was cooked to perfection and the sauce was incredible. Will definitely order again soon!",
    dish: "Pasta Carbonara",
    date: "2023-07-15",
    replied: true,
    reply:
      "Thank you for your kind words, John! We're thrilled you enjoyed our Pasta Carbonara. Looking forward to serving you again soon!",
  },
  {
    id: "2",
    customer: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    comment:
      "The food was great, but delivery took a bit longer than expected. Otherwise, no complaints!",
    dish: "Margherita Pizza",
    date: "2023-07-14",
    replied: false,
  },
  {
    id: "3",
    customer: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    comment:
      "Perfect as always! The tiramisu was heavenly and arrived in perfect condition.",
    dish: "Tiramisu",
    date: "2023-07-13",
    replied: true,
    reply:
      "We appreciate your continued support, Michael! Our pastry chef will be delighted to hear your feedback about the tiramisu.",
  },
  {
    id: "4",
    customer: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 3,
    comment:
      "Food was okay, but not as hot as I would have liked. Garlic bread was pretty good though.",
    dish: "Spaghetti Bolognese",
    date: "2023-07-12",
    replied: false,
  },
  {
    id: "5",
    customer: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    rating: 5,
    comment:
      "Best Italian food in the city! The caprese salad was fresh and delicious.",
    dish: "Caprese Salad",
    date: "2023-07-11",
    replied: false,
  },
  {
    id: "6",
    customer: "Jennifer Garcia",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 2,
    comment:
      "Disappointed with my order. The chicken was overcooked and dry. Hopefully just an off day.",
    dish: "Chicken Parmesan",
    date: "2023-07-10",
    replied: true,
    reply:
      "We're very sorry to hear about your experience, Jennifer. We'd like to make it up to you. Please check your email for a special offer on your next order.",
  },
  {
    id: "7",
    customer: "Robert Brown",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4,
    comment: "Very tasty food and quick delivery. Would order again!",
    dish: "Lasagna",
    date: "2023-07-09",
    replied: false,
  },
];

const SellerReviews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const allReviews = reviews.filter(
    (review) =>
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.dish.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pendingReviews = allReviews.filter((review) => !review.replied);
  const repliedReviews = allReviews.filter((review) => review.replied);

  const positiveReviews = allReviews.filter((review) => review.rating >= 4);
  const negativeReviews = allReviews.filter((review) => review.rating < 4);

  const averageRating =
    allReviews.reduce((sum, review) => sum + review.rating, 0) /
    allReviews.length;

  const handleReply = (reviewId: string) => {
    console.log(`Replying to review ${reviewId}: ${replyText}`);
    setReplyText("");
    setActiveReplyId(null);
  };

  const ratingsCount = [0, 0, 0, 0, 0];
  allReviews.forEach((review) => {
    ratingsCount[review.rating - 1]++;
  });

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  return (
    <div>
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <CardTitle>Review Summary</CardTitle>
                <div className="flex items-center gap-2">
                  <div
                    className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full flex
                      items-center gap-1"
                  >
                    <span>{averageRating.toFixed(1)}</span>
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    from {allReviews.length} reviews
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center w-20">
                      <span className="text-sm font-medium mr-2">{rating}</span>
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${(ratingsCount[rating - 1] / allReviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-16">
                      {ratingsCount[rating - 1]} reviews
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-[#28C76F] mb-1">
                    {(
                      (positiveReviews.length / allReviews.length) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ArrowUp className="text-[#28C76F] mr-1" size={14} />
                    Positive Reviews
                  </div>
                </div>

                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-[#EA5455] mb-1">
                    {(
                      (negativeReviews.length / allReviews.length) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ArrowDown className="text-[#EA5455] mr-1" size={14} />
                    Negative Reviews
                  </div>
                </div>

                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-[#00CFE8] mb-1">
                    {(
                      ((reviews.length - pendingReviews.length) /
                        reviews.length) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageSquare className="text-[#00CFE8] mr-1" size={14} />
                    Response Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>
                Average time to respond to reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-40">
                <div className="text-4xl font-bold mb-2">8.5h</div>
                <div className="flex items-center text-sm text-gray-500">
                  Average response time
                </div>
                <Button className="mt-6 bg-[#FF9F43] hover:bg-[#FF9F43]/90">
                  Improve Response Time
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Customer Reviews</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Search reviews..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} /> Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full mt-6">
              <TabsList>
                <TabsTrigger value="all">
                  All Reviews{" "}
                  <Badge className="ml-2">{allReviews.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending{" "}
                  <Badge className="ml-2">{pendingReviews.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="replied">
                  Replied{" "}
                  <Badge className="ml-2">{repliedReviews.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="positive">
                  Positive{" "}
                  <Badge className="ml-2">{positiveReviews.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="negative">
                  Negative{" "}
                  <Badge className="ml-2">{negativeReviews.length}</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0 space-y-6">
                {allReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleReply={handleReply}
                    renderStars={renderStars}
                  />
                ))}
              </TabsContent>

              <TabsContent value="pending" className="mt-0 space-y-6">
                {pendingReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleReply={handleReply}
                    renderStars={renderStars}
                  />
                ))}
              </TabsContent>

              <TabsContent value="replied" className="mt-0 space-y-6">
                {repliedReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleReply={handleReply}
                    renderStars={renderStars}
                  />
                ))}
              </TabsContent>

              <TabsContent value="positive" className="mt-0 space-y-6">
                {positiveReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleReply={handleReply}
                    renderStars={renderStars}
                  />
                ))}
              </TabsContent>

              <TabsContent value="negative" className="mt-0 space-y-6">
                {negativeReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleReply={handleReply}
                    renderStars={renderStars}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            {/* TabsContent was moved inside the Tabs component */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ReviewItemProps {
  review: Review;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReply: (id: string) => void;
  renderStars: (rating: number) => any;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  activeReplyId,
  setActiveReplyId,
  replyText,
  setReplyText,
  handleReply,
  renderStars,
}) => {
  return (
    <div className="border rounded-lg p-5 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <img
            src={review.avatar}
            alt={review.customer}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-medium">{review.customer}</h3>
              <div className="text-xs text-gray-500">
                Ordered: {review.dish}
              </div>
            </div>
            <div className="flex items-center mt-1 mb-2">
              {renderStars(review.rating)}
              <span className="text-xs text-gray-500 ml-2">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        </div>

        {!review.replied && !activeReplyId && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveReplyId(review.id)}
          >
            Reply
          </Button>
        )}
      </div>

      {review.replied && review.reply && (
        <div className="mt-4 ml-16 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-full bg-[#FF9F43] flex items-center justify-center text-white
                font-semibold"
            >
              M
            </div>
            <div>
              <p className="font-medium text-sm">Mario's Italian</p>
              <p className="text-xs text-gray-500">Restaurant Owner</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">{review.reply}</p>
        </div>
      )}

      {activeReplyId === review.id && (
        <div className="mt-4 ml-16">
          <Textarea
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e: any) => setReplyText(e.target.value)}
            className="mb-3"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveReplyId(null)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-[#FF9F43] hover:bg-[#FF9F43]/90"
              onClick={() => handleReply(review.id)}
            >
              Send Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerReviews;
