import { connectToDatabase, disconnectFromDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get the current user's session
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the current user
    const currentUser = await User.findOne({ email: session?.user?.email });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter orders by seller ID
    const orders = await Order.find({ seller: currentUser._id })
      .populate({
        path: "seller",
        select: "-password -__v -updatedAt",
      })
      .populate({ path: "client", select: "-password -__v -updatedAt" })
      .populate({
        path: "items.menuItem",
      })
      .sort({ createdAt: -1 })
      .lean();

    const totalOrders = orders.length;

    return NextResponse.json({ orders, totalOrders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
      promoDiscount,
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
      promoDiscount: promoDiscount ?? 0,
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
