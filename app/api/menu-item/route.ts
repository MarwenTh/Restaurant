import connectToDatabase from "@/lib/database";
import MenuItem from "@/lib/database/models/menuItem.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

// POST /api/menu-items
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    const { name, description, price, category, ingredients } = body;

    if (!name || !description || !price || !category || !ingredients) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newItem = await MenuItem.create({
      ...body,
      seller: currentUser._id, // 👈 Assign seller from session user
    });

    return NextResponse.json(
      { message: "Menu item created successfully", menuItem: newItem },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
