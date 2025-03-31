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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Clock,
  Plus,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";

interface SpecialHours {
  date: Date;
  isClosed: boolean;
  openTime?: string;
  closeTime?: string;
  note?: string;
}

interface BusinessHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

const businessHours: BusinessHours[] = [
  { day: "Monday", isOpen: true, openTime: "11:00", closeTime: "22:00" },
  { day: "Tuesday", isOpen: true, openTime: "11:00", closeTime: "22:00" },
  { day: "Wednesday", isOpen: true, openTime: "11:00", closeTime: "22:00" },
  { day: "Thursday", isOpen: true, openTime: "11:00", closeTime: "22:00" },
  { day: "Friday", isOpen: true, openTime: "11:00", closeTime: "23:00" },
  { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "23:00" },
  { day: "Sunday", isOpen: true, openTime: "10:00", closeTime: "22:00" },
];

const specialHours: SpecialHours[] = [
  {
    date: new Date(2023, 6, 4), // July 4th
    isClosed: true,
    note: "Independence Day",
  },
  {
    date: new Date(2023, 10, 24), // November 24th
    isClosed: true,
    note: "Thanksgiving",
  },
  {
    date: new Date(2023, 11, 25), // December 25th
    isClosed: true,
    note: "Christmas Day",
  },
  {
    date: new Date(2023, 11, 31), // December 31st
    isClosed: false,
    openTime: "11:00",
    closeTime: "01:00",
    note: "New Year's Eve",
  },
];

const upcomingClosures = specialHours
  .filter((h) => h.isClosed)
  .sort((a, b) => a.date.getTime() - b.date.getTime());

const todayHours = (() => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayName = days[today.getDay()];

  // Check if there's a special hour for today
  const specialHour = specialHours.find(
    (h) =>
      h.date.getDate() === today.getDate() &&
      h.date.getMonth() === today.getMonth() &&
      h.date.getFullYear() === today.getFullYear(),
  );

  if (specialHour) {
    if (specialHour.isClosed) return "Closed";
    return `${specialHour.openTime} - ${specialHour.closeTime}`;
  }

  // Otherwise return regular hours
  const regularHours = businessHours.find((h) => h.day === dayName);
  if (!regularHours || !regularHours.isOpen) return "Closed";
  return `${regularHours.openTime} - ${regularHours.closeTime}`;
})();

const SellerSchedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your regular operating hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessHours.map((hours, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <Switch id={`day-${index}`} checked={hours.isOpen} />
                        <div>
                          <label
                            htmlFor={`day-${index}`}
                            className="font-medium cursor-pointer"
                          >
                            {hours.day}
                          </label>
                        </div>
                      </div>

                      {hours.isOpen ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1
                              rounded"
                          >
                            <Clock size={12} className="mr-1" />
                            {hours.openTime} - {hours.closeTime}
                          </div>
                          <Button variant="ghost" size="icon">
                            <Edit size={16} />
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[#EA5455] border-[#EA5455] bg-red-50"
                        >
                          Closed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="bg-[#FF9F43] hover:bg-[#FF9F43]/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Today's Hours</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-40">
                  <div className="text-4xl font-bold mb-2">
                    {todayHours === "Closed" ? (
                      <span className="text-[#EA5455]">Closed</span>
                    ) : (
                      <span className="text-[#28C76F]">{todayHours}</span>
                    )}
                  </div>
                  <p className="text-gray-500">
                    {todayHours === "Closed"
                      ? "Your restaurant is closed today"
                      : "Your restaurant is open"}
                  </p>

                  <Button variant="outline" size="sm" className="mt-4 gap-2">
                    <Edit size={14} /> Edit Today
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to manage</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />

                <div className="mt-4">
                  <Button className="w-full gap-2 bg-[#FF9F43] hover:bg-[#FF9F43]/90">
                    <Plus size={16} /> Add Special Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="special" className="h-full">
              <TabsContent value="special" className="pt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader className="pt-4 pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>Schedule Exceptions</CardTitle>
                      <TabsList>
                        <TabsTrigger value="special">Special Hours</TabsTrigger>
                        <TabsTrigger value="upcoming">
                          Upcoming Closures
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {specialHours.map((hours, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            {hours.isClosed ? (
                              <XCircle className="text-[#EA5455]" size={20} />
                            ) : (
                              <CheckCircle
                                className="text-[#28C76F]"
                                size={20}
                              />
                            )}
                            <div>
                              <p className="font-medium">
                                {hours.date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-sm text-gray-500">
                                {hours.note}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {hours.isClosed ? (
                              <Badge
                                variant="outline"
                                className="text-[#EA5455] border-[#EA5455] bg-red-50"
                              >
                                Closed
                              </Badge>
                            ) : (
                              <div
                                className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1
                                  rounded"
                              >
                                <Clock size={12} className="mr-1" />
                                {hours.openTime} - {hours.closeTime}
                              </div>
                            )}
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-[#EA5455]"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {specialHours.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="text-lg font-medium">
                            No special hours
                          </h3>
                          <p className="mt-1">
                            Add special hours for holidays or events
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming" className="pt-0">
                <Card className="border-0 shadow-none">
                  <CardHeader className="pt-4 pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>Schedule Exceptions</CardTitle>
                      <TabsList>
                        <TabsTrigger value="special">Special Hours</TabsTrigger>
                        <TabsTrigger value="upcoming">
                          Upcoming Closures
                        </TabsTrigger>
                      </TabsList>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {upcomingClosures.map((closure, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <XCircle className="text-[#EA5455]" size={20} />
                            <div>
                              <p className="font-medium">
                                {closure.date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-sm text-gray-500">
                                {closure.note}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-[#EA5455] border-[#EA5455] bg-red-50"
                            >
                              Closed
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {upcomingClosures.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                          <h3 className="text-lg font-medium">
                            No upcoming closures
                          </h3>
                          <p className="mt-1">
                            You don't have any planned closures
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSchedule;
