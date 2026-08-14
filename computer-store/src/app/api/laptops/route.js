import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { data: laptops, error } = await supabaseAdmin
      .from("laptops")
      .select("*")
      .order("id");

    if (error) throw error;

    return Response.json(
      { success: true, data: laptops || [] },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("Error fetching laptops:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch laptops.",
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.brand || !body.price) {
      return Response.json(
        {
          success: false,
          message: "Name, brand, and price are required.",
        },
        { status: 400 },
      );
    }

    const newLaptop = {
      name: body.name,
      brand: body.brand,
      category: body.category || "Gaming",
      price: Number(body.price),
      cpu: body.cpu || "",
      gpu: body.gpu || "",
      ram: body.ram || "",
      storage: body.storage || "",
      display: body.display || "",
      os: body.os || "",
      keyboard: body.keyboard || "",
      image: body.image || "/images/placeholder.jpg",
    };

    const { data, error } = await supabaseAdmin
      .from("laptops")
      .insert(newLaptop)
      .select()
      .single();

    if (error) throw error;

    return Response.json(
      {
        success: true,
        message: "Laptop added successfully.",
        data,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Invalid request data.",
      },
      { status: 400 },
    );
  }
}
