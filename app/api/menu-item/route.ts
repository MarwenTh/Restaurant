import { connectToDatabase } from "@/lib/database";
import MenuItem from "@/lib/database/models/menuItem.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// All menu-items GET /api/menu-item
// Based on the seller ID GET /api/menu-item?seller=123
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    //
    //     const currentUser = await User.findOne({ email: session.user.email });
    //
    //     if (!currentUser) {
    //       return NextResponse.json({ error: "User not found" }, { status: 404 });
    //     }

    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get("seller");
    // Pagination parameters

    if (sellerId) {
      const menuItems = await MenuItem.find({ seller: sellerId }).populate({
        path: "seller",
        select: "-password -__v -updatedAt", // exclude sensitive/unnecessary fields
      });

      const totalMenuItems = menuItems.length;

      if (!menuItems) {
        return NextResponse.json(
          { error: "No menu items found for this seller" },
          { status: 404 },
        );
      }
      return NextResponse.json({ menuItems, totalMenuItems }, { status: 200 });
    }

    // check for admin privileges before fetching all menu items
    // if (currentUser.role !== "Admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const allMenuItems = await MenuItem.find().populate({
      path: "seller",
      select: "-password -__v -updatedAt", // exclude sensitive/unnecessary fields
    });
    const totalMenuItems = await MenuItem.countDocuments();

    return NextResponse.json({ allMenuItems, totalMenuItems }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/menu-items
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

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
      seller: currentUser._id, // 👈 Assign seller from session user //67df226778b4802e454cd5d1
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

// DELETE /api/menu-item/[id]
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 },
      );
    }

    const menuItem = await MenuItem.findOne({
      _id: id,
      seller: currentUser._id,
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 },
      );
    }

    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Menu item deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/menu-item/[id]
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const menuItem = await MenuItem.findOne({
      _id: id,
      seller: currentUser._id,
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 },
      );
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    );

    return NextResponse.json(
      { message: "Menu item updated successfully", menuItem: updatedMenuItem },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
