import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const seller = await User.findOne({
      _id: params.id,
      role: "Seller",
    }).select(
      "name email role image description cuisine address contactInfo priceRange rating businessHours",
    );

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ seller }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching seller:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
