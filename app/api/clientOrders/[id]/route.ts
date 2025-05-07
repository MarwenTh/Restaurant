import { connectToDatabase } from "@/lib/database";
import { Order } from "@/lib/database/models";
import User from "@/lib/database/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Delete order DELETE /api/clientOrders/[id]
export async function DELETE(
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

    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if the user is the owner of the order
    if (order.client.toString() !== currentUser._id.toString()) {
      return NextResponse.json(
        { error: "You can only delete your own orders" },
        { status: 403 },
      );
    }

    // Check if the order can be deleted (e.g., not in progress)
    if (["preparing", "ready", "in-delivery"].includes(order.status)) {
      return NextResponse.json(
        { error: "Cannot delete an order that is in progress" },
        { status: 400 },
      );
    }

    await Order.findByIdAndDelete(orderId);

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
