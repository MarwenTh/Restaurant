import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Verification from "@/lib/database/models/verification.model";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    const { email } = decoded as { email: string };
    const user = await User.findOne({ email });
    const verificationToken = await Verification.findOne({ email });

    if (!user || user.verified || !verificationToken) {
      return NextResponse.json(
        { error: "User not found or already verified" },
        { status: 400 },
      );
    }

    // Mark user as verified
    user.verified = true;
    await user.save();

    // Remove the verification token
    await verificationToken.deleteOne();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
