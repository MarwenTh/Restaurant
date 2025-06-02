"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

interface ReservationFormProps {
  sellerId: string;
}

export default function ReservationForm({ sellerId }: ReservationFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      seller: sellerId,
      date: formData.get("date"),
      time: formData.get("time"),
      partySize: parseInt(formData.get("partySize") as string),
      specialRequests: formData.get("specialRequests") || "",
      client: user?._id,
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create reservation");
      }

      toast.success("Reservation request sent successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Reservation error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create reservation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Reserve Table</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Reservation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="partySize">Number of Guests</Label>
            <Input
              id="partySize"
              name="partySize"
              type="number"
              min="1"
              max="20"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              placeholder="Any special requests or dietary requirements?"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending Request..." : "Submit Reservation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
