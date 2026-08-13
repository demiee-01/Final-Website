import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";

// GET all orders (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    const client = await clientPromise;
    const db = client.db("computer_store");
    
    // Build query - filter by email if provided
    const query = email ? { customerEmail: email } : {};
    
    const orders = await db
      .collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new order
export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !totalAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("computer_store");

    const order = {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      status: "completed",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json({
      success: true,
      data: { ...order, _id: result.insertedId },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
