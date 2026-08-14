import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("computer-store");
    const laptops = await db.collection("laptops").find({}).toArray();

    return Response.json({
      success: true,
      data: laptops || [],
    });
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
      id: Date.now(),
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

    const client = await clientPromise;
    const db = client.db("computer-store");
    await db.collection("laptops").insertOne(newLaptop);

    return Response.json(
      {
        success: true,
        message: "Laptop added successfully.",
        data: newLaptop,
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
