import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(request: Request) {
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

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get yesterday's date range for comparison
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Fetch today's orders and calculate revenue
    const todayOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
      status: { $ne: "cancelled" }, // Exclude cancelled orders
    });

    // Fetch yesterday's orders for comparison
    const yesterdayOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: yesterday,
        $lt: today,
      },
      status: { $ne: "cancelled" }, // Exclude cancelled orders
    });

    // Calculate today's revenue
    const todayRevenue = todayOrders.reduce((total, order) => {
      return total + (order.totalAmount || 0);
    }, 0);

    // Calculate yesterday's revenue
    const yesterdayRevenue = yesterdayOrders.reduce((total, order) => {
      return total + (order.totalAmount || 0);
    }, 0);

    // Calculate percentage change
    let percentageChange = 0;
    if (yesterdayRevenue > 0) {
      percentageChange =
        ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
    } else if (todayRevenue > 0) {
      percentageChange = 100; // If there was no revenue yesterday but there is revenue today
    }

    return NextResponse.json({
      todayRevenue,
      percentageChange: Math.round(percentageChange * 10) / 10, // Round to 1 decimal place
    });
  } catch (error) {
    console.error("Error fetching today's revenue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
