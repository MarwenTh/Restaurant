import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (!currentUser || currentUser.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = (page - 1) * limit;

    // Fetch paginated users
    const allUsers = await User.find().skip(skip).limit(limit);

    const usersInfo = allUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    }));

    // Get total count
    const totalUsers = await User.countDocuments();

    return NextResponse.json({ users: usersInfo, totalUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    connectToDatabase();
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (
      !currentUser ||
      currentUser.role !== "Admin" ||
      currentUser.email !== session?.user?.email
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
