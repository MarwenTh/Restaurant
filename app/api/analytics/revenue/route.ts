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

    // Get last month's date range for comparison
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Fetch current month's orders
    const currentMonthOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    // Fetch last month's orders
    const lastMonthOrders = await Order.find({
      seller: currentUser._id,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });

    // Calculate daily revenue
    const dailyRevenue = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
      const dayOrders = currentMonthOrders.filter(
        (order) =>
          order.createdAt.getDate() === date.getDate() &&
          order.createdAt.getMonth() === date.getMonth(),
      );
      return {
        date: date.toISOString().split("T")[0],
        revenue: dayOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      };
    });

    // Calculate total revenue and percentage change
    const totalRevenue = currentMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const lastMonthRevenue = lastMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const revenuePercentageChange = lastMonthRevenue
      ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 100;

    // Calculate revenue by payment method
    const revenueByPaymentMethod = currentMonthOrders.reduce(
      (acc, order) => {
        acc[order.paymentMethod] =
          (acc[order.paymentMethod] || 0) + order.totalAmount;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate revenue by time of day
    const revenueByTimeOfDay = Array.from({ length: 24 }, (_, hour) => {
      const hourOrders = currentMonthOrders.filter(
        (order) => order.createdAt.getHours() === hour,
      );
      return {
        hour,
        revenue: hourOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      };
    });

    return NextResponse.json({
      dailyRevenue,
      totalRevenue,
      revenuePercentageChange,
      revenueByPaymentMethod,
      revenueByTimeOfDay,
    });
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
