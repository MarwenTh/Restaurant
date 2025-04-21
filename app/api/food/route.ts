import { connectToDatabase, disconnectFromDatabase } from "@/lib/database";
import MenuItem from "@/lib/database/models/menuItem.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// All menu-items GET /api/menu-item
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const menuItem = await MenuItem.find().populate({
      path: "seller",
      select: "-password -__v -updatedAt", // exclude sensitive/unnecessary fields
    });
    const totalMenuItems = menuItem.length;

    await disconnectFromDatabase();
    return NextResponse.json({ menuItem, totalMenuItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
