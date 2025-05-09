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

    // Get the start of the current week (Monday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Set to Monday
    startOfWeek.setHours(0, 0, 0, 0);

    // Get the end of the current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Fetch orders for the current week
    const weeklyOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    });

    // Initialize revenue data for each day of the week
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const revenueData = daysOfWeek.map((day) => ({
      name: day,
      revenue: 0,
    }));

    // Calculate revenue for each day
    weeklyOrders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const dayIndex = orderDate.getDay() - 1; // Convert Sunday (0) to -1, then adjust
      const adjustedIndex = dayIndex === -1 ? 6 : dayIndex; // Convert Sunday to last index

      if (adjustedIndex >= 0 && adjustedIndex < 7) {
        revenueData[adjustedIndex].revenue += order.totalAmount;
      }
    });

    return NextResponse.json({ revenueData });
  } catch (error) {
    console.error("Error fetching weekly revenue data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
