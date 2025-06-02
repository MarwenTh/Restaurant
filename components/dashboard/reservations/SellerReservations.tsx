"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Mail } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
  _id: string;
  date: string;
  time: string;
  partySize: number;
  status: "pending" | "confirmed" | "cancelled";
  specialRequests: string;
  client: {
    name: string;
    email: string;
  };
}

export default function SellerReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reservations?role=seller");
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setReservations((prev) =>
          prev.map((res) =>
            res._id === id
              ? { ...res, status: status as Reservation["status"] }
              : res,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to update reservation:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reservation Requests</h2>
      <div className="grid gap-4">
        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No reservation requests found
            </CardContent>
          </Card>
        ) : (
          reservations.map((reservation) => (
            <Card key={reservation._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {reservation.client.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {reservation.client.email}
                    </div>
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status.charAt(0).toUpperCase() +
                      reservation.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(reservation.date), "MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {reservation.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {reservation.partySize} people
                  </div>
                  {reservation.specialRequests && (
                    <p className="text-sm text-gray-600 mt-2">
                      Special requests: {reservation.specialRequests}
                    </p>
                  )}
                  {reservation.status === "pending" && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          updateReservationStatus(reservation._id, "confirmed")
                        }
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          updateReservationStatus(reservation._id, "cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
