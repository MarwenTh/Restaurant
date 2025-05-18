import { NextRequest, NextResponse } from "next/server";
import SiteReview from "@/lib/database/models/site.review.model";
import { connectToDatabase } from "@/lib/database/index";

export async function GET() {
  await connectToDatabase();
  const reviews = await SiteReview.find().sort({ createdAt: -1 });
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { name, reviewMessage, image, rating, role } = body;
  try {
    const review = await SiteReview.create({
      name: name || "Guest",
      reviewMessage,
      image,
      rating,
      role: role || "User",
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    const deleted = await SiteReview.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    );
  }
}
