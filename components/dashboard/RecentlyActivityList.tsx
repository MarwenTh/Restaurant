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
import {
  ShoppingBag,
  Users,
  Star,
  AlertCircle,
  Bell,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import useRecentActivities, { ActivityType } from "@/hooks/useRecentActivities";

// Activity types
type Activity = {
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
};

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

const ActivitySkeleton = () => (
  <div className="flex items-start space-x-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

const RecentActivityList: React.FC = () => {
  const { activities, loading, error, retry } = useRecentActivities();

  if (error) {
    return (
      <Card className="card-shadow">
        <CardHeader className="pb-3">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 space-y-4">
            <div className="text-red-500">
              Error loading activities: {error}
            </div>
            <Button
              onClick={retry}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading
            ? // Show 5 skeleton items while loading
              Array.from({ length: 5 }).map((_, index) => (
                <ActivitySkeleton key={index} />
              ))
            : activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
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
                      <span className="text-xs text-[#5e6369]">
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
