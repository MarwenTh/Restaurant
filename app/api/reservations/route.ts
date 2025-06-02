import { connectToDatabase } from "@/lib/database";
import { Order } from "@/lib/database/models";
import MenuItem from "@/lib/database/models/menuItem.model";
import Promo from "@/lib/database/models/promo.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/lib/database/models/reservations.model";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    const body = await req.json();

    // Validate required fields
    if (!body.seller || !body.date || !body.time || !body.partySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const reservation = await Reservation.create({
      seller: body.seller,
      date: body.date,
      time: body.time,
      partySize: body.partySize,
      specialRequests: body.specialRequests || "",
      client: body.client,
      status: "pending",
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Reservation creation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create reservation",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role"); // "client" or "seller"
    const userId = await User.findOne({ email: session?.user?.email });

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await connectToDatabase();

    const query = role === "seller" ? { seller: userId } : { client: userId };

    const reservations = await Reservation.find(query)
      .populate("client", "name email")
      .populate("seller", "name email")
      .sort({ date: 1, time: 1 });

    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession();

    const { id, status } = await req.json();
    await connectToDatabase();

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    reservation.status = status;
    await reservation.save();

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 },
    );
  }
}
