import { connectToDatabase, disconnectFromDatabase } from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import MenuItem from "@/lib/database/models/menuItem.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    const order = await Order.findById(orderId)
      .populate({
        path: "seller",
        select: "-password -__v -updatedAt",
      })
      .populate({ path: "client", select: "-password -__v -updatedAt" })
      .populate({
        path: "items.menuItem",
      })
      .populate({
        path: "driver",
        select: "-password -__v -updatedAt",
      })
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectToDatabase();

    const orderId = params.id;
    const { status } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "ready",
      "in-delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    )
      .populate({
        path: "seller",
        select: "-password -__v -updatedAt",
      })
      .populate({ path: "client", select: "-password -__v -updatedAt" })
      .populate({
        path: "items.menuItem",
      })
      .populate({
        path: "driver",
        select: "-password -__v -updatedAt",
      })
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
