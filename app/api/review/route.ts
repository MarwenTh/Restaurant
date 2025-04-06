import connectToDatabase from "@/lib/database";
import Review from "@/lib/database/models/review.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getSession();
    //     if (!session) {
    //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    //     }
    //
    //     const currentUser = await User.findOne({ email: session.user?.email });
    //     if (!currentUser) {
    //       return NextResponse.json({ error: "User not found" }, { status: 404 });
    //     }

    const body = await request.json();

    const { Seller, rating, comment, images, orderRef, status } = body;

    if (!Seller || !rating || !comment) {
      return NextResponse.json(
        { error: "Seller, rating, and comment are required." },
        { status: 400 },
      );
    }

    const newReview = await Review.create({
      Seller,
      client: "67d6acf9b2035318ad929dd9", //currentUser._id,
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
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
