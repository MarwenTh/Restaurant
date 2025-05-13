import { connectToDatabase } from "@/lib/database";
import Promo from "@/lib/database/models/promo.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
      { code, discount, available },
      { new: true },
    );
    if (!promo) {
      return NextResponse.json(
        { error: "Promo code not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(promo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
