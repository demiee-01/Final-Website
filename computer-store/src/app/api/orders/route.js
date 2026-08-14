import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { auth } from "@clerk/nextjs/server";

function formatOrder(order) {
  return {
    ...order,
    userId: order.user_id,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    customerPhone: order.customer_phone,
    shippingAddress: order.shipping_address,
    paymentMethod: order.payment_method,
    totalAmount: Number(order.total_amount),
    createdAt: order.created_at,
  };
}

// GET all orders (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let query = supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false });
    if (email) query = query.eq("customer_email", email);

    const { data: orders, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: (orders || []).map(formatOrder) });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: error.message, data: [] },
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
    const { customerName, customerEmail, customerPhone, shippingAddress, paymentMethod, items, totalAmount } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !totalAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = {
      user_id: userId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      payment_method: paymentMethod || null,
      items,
      total_amount: totalAmount,
      status: "completed",
    };

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: formatOrder(data),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
