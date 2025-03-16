import User from "@/lib/database/models/user.model";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    const currentUser = await User.findOne({ email: session?.user?.email });

    // if (!currentUser || currentUser.role !== "Admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const allUsers = await User.find({});
    const usersInfo = allUsers.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    }));

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
