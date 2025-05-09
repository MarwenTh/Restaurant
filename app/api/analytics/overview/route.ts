import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import Review from "@/lib/database/models/review.model";
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

    // Calculate total orders and percentage change
    const totalOrders = currentMonthOrders.length;
    const lastMonthTotalOrders = lastMonthOrders.length;
    const orderPercentageChange = lastMonthTotalOrders
      ? ((totalOrders - lastMonthTotalOrders) / lastMonthTotalOrders) * 100
      : 100;

    // Calculate total sales and percentage change
    const totalSales = currentMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const lastMonthSales = lastMonthOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const salesPercentageChange = lastMonthSales
      ? ((totalSales - lastMonthSales) / lastMonthSales) * 100
      : 100;

    // Get unique customers
    const uniqueCustomers = new Set(
      currentMonthOrders.map((order) => order.client.toString()),
    ).size;
    const lastMonthUniqueCustomers = new Set(
      lastMonthOrders.map((order) => order.client.toString()),
    ).size;
    const customerPercentageChange = lastMonthUniqueCustomers
      ? ((uniqueCustomers - lastMonthUniqueCustomers) /
          lastMonthUniqueCustomers) *
        100
      : 100;

    // Calculate average rating
    const reviews = await Review.find({ seller: currentUser._id });
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length || 0;
    const lastMonthReviews = await Review.find({
      seller: currentUser._id,
      createdAt: {
        $gte: startOfLastMonth,
        $lte: endOfLastMonth,
      },
    });
    const lastMonthRating =
      lastMonthReviews.reduce((sum, review) => sum + review.rating, 0) /
        lastMonthReviews.length || 0;
    const ratingChange = averageRating - lastMonthRating;

    return NextResponse.json({
      totalOrders,
      orderPercentageChange,
      totalSales,
      salesPercentageChange,
      uniqueCustomers,
      customerPercentageChange,
      averageRating,
      ratingChange,
    });
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
