import { connectToDatabase } from "@/lib/database";
import { Order } from "@/lib/database/models";
import MenuItem from "@/lib/database/models/menuItem.model";
import Promo from "@/lib/database/models/promo.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// All promo  GET /api/promo
export async function GET(request: NextRequest) {
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

    const promo = await Promo.find();

    return NextResponse.json(promo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Create promo POST /api/promo
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

    const { code, discount, available } = await request.json();

    const promo = await Promo.create({ code, discount, available });

    return NextResponse.json(promo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Update promo PUT /api/promo/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const { code, discount, available } = await request.json();

    const promo = await Promo.findByIdAndUpdate(
      params.id,
      { code, discount },
      { new: true },
    );

    return NextResponse.json(promo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Delete promo DELETE /api/promo?id=123
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
    const promoId = searchParams.get("id");

    if (!promoId) {
      return NextResponse.json(
        { error: "Promo ID is required" },
        { status: 400 },
      );
    }

    await Promo.findByIdAndDelete(promoId);

    return NextResponse.json(
      { message: "Promo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
