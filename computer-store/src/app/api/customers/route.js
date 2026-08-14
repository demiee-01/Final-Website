import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET customer statistics from orders
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("computer_store");

    // Aggregate orders by customer
    const customers = await db
      .collection("orders")
      .aggregate([
        {
          $group: {
            _id: {
              email: "$customerEmail",
              name: "$customerName",
              userId: "$userId",
            },
            totalOrders: { $sum: 1 },
            totalSpent: { $sum: "$totalAmount" },
            firstOrder: { $min: "$createdAt" },
            lastOrder: { $max: "$createdAt" },
          },
        },
        {
          $project: {
            _id: 0,
            email: "$_id.email",
            name: "$_id.name",
            userId: "$_id.userId",
            orders: "$totalOrders",
            totalSpent: "$totalSpent",
            joinedDate: "$firstOrder",
            lastOrderDate: "$lastOrder",
          },
        },
        {
          $sort: { totalSpent: -1 },
        },
      ])
      .toArray();

    return NextResponse.json({ success: true, data: customers || [] });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { success: false, message: error.message, data: [] },
      { status: 500 }
    );
  }
}
