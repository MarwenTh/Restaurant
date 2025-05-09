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

    // Get current month's date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Fetch orders for the current month
    const orders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    // Calculate daily orders
    const dailyOrders = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
      const dayOrders = orders.filter(
        (order) =>
          order.createdAt.getDate() === date.getDate() &&
          order.createdAt.getMonth() === date.getMonth(),
      );
      return {
        date: date.toISOString().split("T")[0],
        orders: dayOrders.length,
      };
    });

    // Calculate order status distribution
    const statusDistribution = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate average order value
    const totalAmount = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const averageOrderValue = orders.length ? totalAmount / orders.length : 0;

    // Calculate peak hours
    const hourlyOrders = Array.from({ length: 24 }, (_, hour) => {
      const hourOrders = orders.filter(
        (order) => order.createdAt.getHours() === hour,
      );
      return {
        hour,
        orders: hourOrders.length,
      };
    });

    return NextResponse.json({
      dailyOrders,
      statusDistribution,
      averageOrderValue,
      hourlyOrders,
    });
  } catch (error) {
    console.error("Error fetching order analytics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
