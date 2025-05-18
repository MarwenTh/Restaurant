import { connectToDatabase } from "@/lib/database";
import Review from "@/lib/database/models/review.model";
import User from "@/lib/database/models/user.model";
import MenuItem from "@/lib/database/models/menuItem.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";

// GET reviews for a specific food item
export async function GET(request: Request) {
  console.log("GET /api/reviews - Starting request");
  try {
    const { searchParams } = new URL(request.url);
    const foodId = searchParams.get("foodId");
    console.log("GET /api/reviews - FoodId:", foodId);

    if (!foodId) {
      console.log("GET /api/reviews - Error: Food ID is missing");
      return NextResponse.json(
        { error: "Food ID is required" },
        { status: 400 },
      );
    }

    console.log("GET /api/reviews - Connecting to database");
    await connectToDatabase();

    // Find the menu item to get its seller
    console.log("GET /api/reviews - Finding menu item");
    const menuItem = await MenuItem.findById(foodId);
    if (!menuItem) {
      console.log("GET /api/reviews - Error: Menu item not found");
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 },
      );
    }
    console.log("GET /api/reviews - Menu item found:", {
      id: menuItem._id,
      seller: menuItem.seller,
    });

    // Fetch reviews for this food item's seller with proper population
    console.log("GET /api/reviews - Fetching reviews");
    const reviews = await Review.find({ Seller: menuItem.seller })
      .populate({
        path: "client",
        select: "name image",
        model: "User",
      })
      .sort({ createdAt: -1 });
    console.log("GET /api/reviews - Found reviews:", reviews.length);

    // Format reviews for the frontend with null checks
    const formattedReviews = reviews.map((review) => {
      // Get client name safely
      const clientName = review.client?.name || "Anonymous User";
      const clientImage = review.client?.image || null;

      return {
        id: review._id.toString(),
        customer: clientName,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        avatar:
          clientImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            clientName,
          )}&background=random`,
        helpfulCount: review.helpfulCount || 0,
        response: review.response || null,
      };
    });

    console.log("GET /api/reviews - Successfully formatted reviews");
    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    console.error("GET /api/reviews - Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST a new review
export async function POST(request: Request) {
  console.log("POST /api/reviews - Starting request");
  try {
    const session = (await getServerSession(authOptions)) as Session | null;
    console.log("POST /api/reviews - Session:", session?.user?.email);

    if (!session?.user?.email) {
      console.log("POST /api/reviews - Error: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { foodId, rating, comment } = body;
    console.log("POST /api/reviews - Request body:", {
      foodId,
      rating,
      comment,
    });

    if (!foodId || !rating || !comment) {
      console.log("POST /api/reviews - Error: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    console.log("POST /api/reviews - Connecting to database");
    await connectToDatabase();

    // Get the current user
    console.log("POST /api/reviews - Finding current user");
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      console.log("POST /api/reviews - Error: User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("POST /api/reviews - Current user found:", currentUser._id);

    // Find the menu item to get its seller
    console.log("POST /api/reviews - Finding menu item");
    const menuItem = await MenuItem.findById(foodId);
    if (!menuItem) {
      console.log("POST /api/reviews - Error: Menu item not found");
      return NextResponse.json(
        { error: "Food item not found" },
        { status: 404 },
      );
    }
    console.log("POST /api/reviews - Menu item found:", {
      id: menuItem._id,
      seller: menuItem.seller,
    });

    // Create the review
    console.log("POST /api/reviews - Creating review");
    const review = await Review.create({
      Seller: menuItem.seller,
      client: currentUser._id,
      rating,
      comment,
      status: "published",
      helpfulCount: 0,
    });
    console.log("POST /api/reviews - Review created:", review._id);

    // Update the menu item's rating and review count
    console.log("POST /api/reviews - Updating menu item stats");
    const allReviews = await Review.find({ Seller: menuItem.seller });
    const averageRating =
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      allReviews.length;

    await MenuItem.findByIdAndUpdate(foodId, {
      rating: averageRating,
      reviews: allReviews.length,
    });
    console.log("POST /api/reviews - Menu item updated with new stats");

    const response = {
      message: "Review submitted successfully",
      review: {
        id: review._id.toString(),
        customer: currentUser.name || "Anonymous User",
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        avatar:
          currentUser.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            currentUser.name || "Anonymous User",
          )}&background=random`,
        helpfulCount: 0,
      },
    };
    console.log("POST /api/reviews - Success:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("POST /api/reviews - Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
