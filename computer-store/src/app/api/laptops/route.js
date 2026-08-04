import { laptops } from "@/data/laptops";

export async function GET() {
  return Response.json({
    success: true,
    data: laptops,
  });
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
      id: Date.now(),
      name: body.name,
      brand: body.brand,
      price: Number(body.price),
      cpu: body.cpu || "",
      ram: body.ram || "",
      storage: body.storage || "",
      image: body.image || "/images/placeholder.jpg",
    };

    laptops.push(newLaptop);

    return Response.json(
      {
        success: true,
        message: "Laptop added successfully.",
        data: newLaptop,
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid request data.",
      },
      { status: 400 },
    );
  }
}
