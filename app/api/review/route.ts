import { connectToDatabase } from "@/lib/database";
import Review from "@/lib/database/models/review.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get("sellerId");

    if (!sellerId) {
      return NextResponse.json(
        { error: "Seller ID is required" },
        { status: 400 },
      );
    }

    const reviews = await Review.find({ Seller: sellerId })
      .populate("client", "name image")
      .populate("response.responder", "name image")
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = (await getServerSession(authOptions)) as Session;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user?.email });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    const {
      Seller,
      rating,
      comment,
      images,
      orderRef,
      status,
      reviewId,
      reply,
      isHelpful,
    } = body;

    // Handle review submission
    if (!reviewId) {
      if (!Seller) {
        return NextResponse.json(
          { error: "Seller is required" },
          { status: 400 },
        );
      }

      if (!rating) {
        return NextResponse.json(
          { error: "Rating is required" },
          { status: 400 },
        );
      }

      if (!comment) {
        return NextResponse.json(
          { error: "Comment is required" },
          { status: 400 },
        );
      }

      const newReview = await Review.create({
        Seller,
        client: currentUser._id,
        rating,
        comment,
        images,
        orderRef,
        status: status || "published",
        helpfulCount: 0,
      });

      return NextResponse.json(
        { message: "Review created successfully", review: newReview },
        { status: 201 },
      );
    }

    // Handle reply or helpful count update
    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (reply) {
      // Add reply
      review.response = {
        responder: currentUser._id,
        text: reply,
        date: new Date(),
      };
    } else if (typeof isHelpful === "boolean") {
      // Update helpful count
      review.helpfulCount = isHelpful
        ? review.helpfulCount + 1
        : review.helpfulCount - 1;
    }

    await review.save();

    return NextResponse.json(
      { message: "Review updated successfully", review },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
