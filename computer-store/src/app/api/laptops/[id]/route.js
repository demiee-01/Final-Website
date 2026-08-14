import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET one laptop by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const laptopId = Number(id);

    const { data: laptop, error } = await supabaseAdmin
      .from("laptops")
      .select("*")
      .eq("id", laptopId)
      .maybeSingle();

    if (error) throw error;

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
  } catch (error) {
    console.error("Error fetching laptop:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch laptop.",
      },
      { status: 500 }
    );
  }
}

// UPDATE laptop by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const laptopId = Number(id);
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

    const updatedLaptop = {
      name: body.name.trim(),
      brand: body.brand.trim(),
      category: body.category || "Gaming",
      price: Number(body.price),
      cpu: body.cpu?.trim() || "",
      gpu: body.gpu?.trim() || "",
      ram: body.ram?.trim() || "",
      storage: body.storage?.trim() || "",
      display: body.display?.trim() || "",
      os: body.os?.trim() || "",
      keyboard: body.keyboard?.trim() || "",
      image: body.image?.trim() || "",
    };

    const { data: result, error } = await supabaseAdmin
      .from("laptops")
      .update(updatedLaptop)
      .eq("id", laptopId)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!result) {
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
      message: "Laptop updated successfully.",
      data: result,
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

// DELETE laptop by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const laptopId = Number(id);

    const { data: laptop, error: laptopError } = await supabaseAdmin
      .from("laptops")
      .select("*")
      .eq("id", laptopId)
      .maybeSingle();

    if (laptopError) throw laptopError;

    if (!laptop) {
      return Response.json(
        {
          success: false,
          message: "Laptop not found.",
        },
        { status: 404 },
      );
    }

    const { data: result, error: deleteError } = await supabaseAdmin
      .from("laptops")
      .delete()
      .eq("id", laptopId)
      .select()
      .single();

    if (deleteError) throw deleteError;

    // Delete image from Supabase if it exists and is a Supabase URL
    if (laptop.image && laptop.image.includes('supabase.co')) {
      try {
        // Extract the file path from the URL
        // URL format: https://xxxxx.supabase.co/storage/v1/object/public/laptop-images/laptops/filename.jpg
        const urlParts = laptop.image.split('/laptop-images/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          
          const { error: storageDeleteError } = await supabaseAdmin.storage
            .from('laptop-images')
            .remove([filePath]);

          if (storageDeleteError) {
            console.error('Failed to delete image from Supabase:', storageDeleteError);
            // Don't fail the whole operation if image deletion fails
          } else {
            console.log('✅ Image deleted from Supabase:', filePath);
          }
        }
      } catch (imageError) {
        console.error('Error deleting image:', imageError);
        // Continue even if image deletion fails
      }
    }

    return Response.json({
      success: true,
      message: "Laptop deleted successfully.",
      data: result,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to delete laptop.",
      },
      { status: 500 },
    );
  }
}
