"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
  _id: string;
  date: string;
  time: string;
  partySize: number;
  status: "pending" | "confirmed" | "cancelled";
  specialRequests: string;
  seller: {
    name: string;
    email: string;
  };
}

export default function ClientReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reservations?role=client");
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
      <h2 className="text-2xl font-bold">My Reservations</h2>
      <div className="grid gap-4">
        {reservations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No reservations found
            </CardContent>
          </Card>
        ) : (
          reservations.map((reservation) => (
            <Card key={reservation._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {reservation.seller.name}
                  </CardTitle>
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
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
