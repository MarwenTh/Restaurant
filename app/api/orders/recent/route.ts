import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch today's orders
    const orders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate("client", "name") // Populate client name
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Limit to 10 most recent orders

    // Format orders for the frontend
    const formattedOrders = orders.map((order) => ({
      id: order._id.toString(),
      customer: order.client.name,
      items: order.items
        .map((item: any) => `${item.name} x${item.quantity}`)
        .join(", "),
      total: order.totalAmount,
      status: order.status,
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
