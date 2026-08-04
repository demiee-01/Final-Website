import { laptops } from "@/data/laptops";

// GET one laptop by ID
export async function GET(request, { params }) {
  const { id } = await params;
  const laptopId = Number(id);

  const laptop = laptops.find((item) => item.id === laptopId);

  if (!laptop) {
    return Response.json(
      {
        success: false,
        message: "Laptop not found.",
      },
      { status: 404 },
    );
  }

  return Response.json({
    success: true,
    data: laptop,
  });
}

// UPDATE laptop by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const laptopId = Number(id);
    const body = await request.json();

    const laptopIndex = laptops.findIndex((item) => item.id === laptopId);

    if (laptopIndex === -1) {
      return Response.json(
        {
          success: false,
          message: "Laptop not found.",
        },
        { status: 404 },
      );
    }

    if (!body.name || !body.brand || !body.price) {
      return Response.json(
        {
          success: false,
          message: "Name, brand, and price are required.",
        },
        { status: 400 },
      );
    }

    const updatedLaptop = {
      ...laptops[laptopIndex],
      name: body.name.trim(),
      brand: body.brand.trim(),
      price: Number(body.price),
      cpu: body.cpu?.trim() || "",
      ram: body.ram?.trim() || "",
      storage: body.storage?.trim() || "",
      image: body.image?.trim() || laptops[laptopIndex].image,
    };

    laptops[laptopIndex] = updatedLaptop;

    return Response.json({
      success: true,
      message: "Laptop updated successfully.",
      data: updatedLaptop,
    });
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

// delete
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const laptopId = Number(id);

    const laptopIndex = laptops.findIndex((item) => item.id === laptopId);

    if (laptopIndex === -1) {
      return Response.json(
        {
          success: false,
          message: "Laptop not found.",
        },
        { status: 404 },
      );
    }

    const deletedLaptop = laptops[laptopIndex];

    laptops.splice(laptopIndex, 1);

    return Response.json({
      success: true,
      message: "Laptop deleted successfully.",
      data: deletedLaptop,
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: "Failed to delete laptop.",
      },
      { status: 500 },
    );
  }
}