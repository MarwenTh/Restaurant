import { connectToDatabase } from "@/lib/database";
import Review from "@/lib/database/models/review.model";
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

    // Fetch today's reviews
    const todayReviews = await Review.find({
      seller: currentUser._id,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Fetch yesterday's reviews for comparison
    const yesterdayReviews = await Review.find({
      seller: currentUser._id,
      createdAt: {
        $gte: yesterday,
        $lt: today,
      },
    });

    // Calculate average ratings
    const todayRating =
      todayReviews.length > 0
        ? todayReviews.reduce((acc, review) => acc + review.rating, 0) /
          todayReviews.length
        : 0;

    const yesterdayRating =
      yesterdayReviews.length > 0
        ? yesterdayReviews.reduce((acc, review) => acc + review.rating, 0) /
          yesterdayReviews.length
        : 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (yesterdayRating > 0) {
      percentageChange =
        ((todayRating - yesterdayRating) / yesterdayRating) * 100;
    } else if (todayRating > 0) {
      percentageChange = 100;
    }

    // Get overall average rating
    const allReviews = await Review.find({ seller: currentUser._id });
    const averageRating =
      allReviews.length > 0
        ? allReviews.reduce((acc, review) => acc + review.rating, 0) /
          allReviews.length
        : 0;

    return NextResponse.json({
      rating: Number(averageRating.toFixed(1)),
      percentageChange: Math.round(percentageChange * 10) / 10,
      totalReviews: allReviews.length,
    });
  } catch (error) {
    console.error("Error fetching rating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
