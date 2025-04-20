import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await User.findOne({ email: session?.user?.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    const {
      seller,
      items,
      totalAmount,
      deliveryType,
      paymentStatus,
      deliveryAddress,
      deliveryFee,
      tip,
      scheduledFor,
      estimatedDeliveryTime,
      actualDeliveryTime,
      driver,
      refundInfo,
      promoCodeApplied,
      discountAmount,
      specialInstructions,
      quantity,
    } = body;

    // Validate required fields
    if (!seller || !items || !totalAmount || !deliveryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newOrder = await Order.create({
      client: currentUser._id,
      seller,
      items,
      totalAmount,
      deliveryType,
      paymentStatus: paymentStatus || "pending",
      deliveryFee,
      tip: tip ?? 0,
      scheduledFor,
      estimatedDeliveryTime,
      actualDeliveryTime,
      driver,
      refundInfo,
      promoCodeApplied,
      discountAmount: discountAmount ?? 0,
      specialInstructions,
      deliveryAddress: deliveryAddress
        ? {
            street: deliveryAddress.street,
            city: deliveryAddress.city,
            state: deliveryAddress.state,
            zipCode: deliveryAddress.zipCode,
            country: deliveryAddress.country,
            specialInstructions: deliveryAddress.specialInstructions,
          }
        : undefined,
      quantity,
    });

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
