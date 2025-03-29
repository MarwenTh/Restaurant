"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingBag, Users, Star, AlertCircle, Bell } from "lucide-react";

// Activity types
type ActivityType = "order" | "user" | "review" | "alert" | "notification";

interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const activities: Activity[] = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description: "Order #58912 - $124.00",
    time: "5 minutes ago",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
  },
  {
    id: 2,
    type: "user",
    title: "New user registered",
    description: "Carlos Rodriguez joined as a new customer",
    time: "15 minutes ago",
    user: {
      name: "Carlos Rodriguez",
      initials: "CR",
    },
  },
  {
    id: 3,
    type: "review",
    title: "New review submitted",
    description: "5-star rating for Greek Salad",
    time: "37 minutes ago",
    user: {
      name: "Emily Chen",
      initials: "EC",
    },
  },
  {
    id: 4,
    type: "alert",
    title: "Low inventory alert",
    description: "Beef tenderloin (2 kg remaining)",
    time: "1 hour ago",
  },
  {
    id: 5,
    type: "notification",
    title: "Staff schedule updated",
    description: "2 delivery drivers added for Friday night shift",
    time: "2 hours ago",
  },
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "order":
      return <ShoppingBag className="h-4 w-4 text-blue-500" />;
    case "user":
      return <Users className="h-4 w-4 text-green-500" />;
    case "review":
      return <Star className="h-4 w-4 text-yellow-500" />;
    case "alert":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "notification":
      return <Bell className="h-4 w-4 text-purple-500" />;
  }
};

const RecentActivityList: React.FC = () => {
  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 animate-fade-in"
              style={{ animationDelay: `${activity.id * 100}ms` }}
            >
              {activity.user ? (
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="bg-secondary text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
              )}

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <span className="text-xs text-[#f1f5f9]">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm dark:text-[#f1f5f9] text-[#505457]">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
