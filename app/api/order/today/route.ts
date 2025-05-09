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

    // Get yesterday's date range for comparison
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);

    // Fetch today's orders
    const todayOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Fetch yesterday's orders for comparison
    const yesterdayOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: yesterday,
        $lt: today,
      },
    });

    // Calculate percentage change
    const todayCount = todayOrders.length;
    const yesterdayCount = yesterdayOrders.length;
    let percentageChange = 0;

    if (yesterdayCount > 0) {
      percentageChange = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    } else if (todayCount > 0) {
      percentageChange = 100; // If there were no orders yesterday but there are orders today
    }

    return NextResponse.json({
      todayOrders: todayCount,
      percentageChange: Math.round(percentageChange * 10) / 10, // Round to 1 decimal place
    });
  } catch (error) {
    console.error("Error fetching today's orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
