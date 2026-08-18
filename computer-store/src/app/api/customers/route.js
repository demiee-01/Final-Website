import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET customer statistics from orders
export async function GET() {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select("user_id, customer_email, customer_name, total_amount, created_at");

    if (error) throw error;

    const customersByEmail = new Map();
    for (const order of orders || []) {
      const current = customersByEmail.get(order.customer_email) || {
        email: order.customer_email,
        name: order.customer_name,
        userId: order.user_id,
        orders: 0,
        totalSpent: 0,
        joinedDate: order.created_at,
        lastOrderDate: order.created_at,
      };

      current.orders += 1;
      current.totalSpent += Number(order.total_amount);
      if (order.created_at < current.joinedDate) current.joinedDate = order.created_at;
      if (order.created_at > current.lastOrderDate) current.lastOrderDate = order.created_at;
      customersByEmail.set(order.customer_email, current);
    }

    const customers = [...customersByEmail.values()].sort((a, b) => b.totalSpent - a.totalSpent);

    return NextResponse.json({ success: true, data: customers || [] });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { success: false, message: error.message, data: [] },
      { status: 500 }
    );
  }
}

// DELETE customer and all their orders
export async function DELETE(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Delete all orders for this customer
    const { error: ordersError } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("customer_email", email);

    if (ordersError) throw ordersError;

    return NextResponse.json({
      success: true,
      message: "Customer and all their orders deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
