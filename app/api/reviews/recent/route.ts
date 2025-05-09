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

    // Fetch recent reviews
    const reviews = await Review.find({ seller: currentUser._id })
      .populate("client", "name") // Populate client name
      .populate("order", "items") // Populate order items
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5); // Limit to 5 most recent reviews

    // Format reviews for the frontend
    const formattedReviews = reviews.map((review) => ({
      id: review._id.toString(),
      customer: review.client.name,
      rating: review.rating,
      comment: review.comment,
      date: new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      dish: review.order.items[0]?.name || "Multiple Items", // Get first item name or default
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        review.client.name,
      )}&background=random`,
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    console.error("Error fetching recent reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
