import { connectToDatabase } from "@/lib/database";
import { Order } from "@/lib/database/models";
import MenuItem from "@/lib/database/models/menuItem.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// All client orders GET /api/clientOrders
// Based on the client ID GET /api/clientOrders?client=123
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("client");

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = (page - 1) * limit;

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 },
      );
    }

    const orders = await Order.find({ client: clientId })
      .populate({
        path: "items.menuItem",
        select: "-__v -updatedAt",
      })
      .populate({
        path: "seller",
        select: "-password -__v -updatedAt",
      })
      .skip(skip)
      .limit(limit);

    const totalOrders = orders.length;

    if (!orders) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    return NextResponse.json({ orders, totalOrders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
