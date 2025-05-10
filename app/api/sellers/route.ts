import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Fetch sellers with pagination
    const sellers = await User.find({ role: "Seller" })
      .select(
        "name email role image description cuisine address contactInfo priceRange rating",
      )
      .skip(skip)
      .limit(limit);

    const totalSellers = await User.countDocuments({ role: "Seller" });

    return NextResponse.json(
      {
        sellers,
        totalSellers,
        currentPage: page,
        totalPages: Math.ceil(totalSellers / limit),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
