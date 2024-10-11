import Product from "@/models/Product";

// Fetch all products
export async function GET() {
  try {
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Error fetching products", { status: 500 });
  }
}

// Add a new product
export async function POST(request) {
  try {
    const body = await request.json();
    const product = new Product(body);
    await product.save();
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response("Error creating product", { status: 500 });
  }
}

// Update an existing product by ID
export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Error updating product", { status: 500 });
  }
}

// Partially update an existing product by ID (similar to PUT, but can handle partial data)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response("Error updating product", { status: 500 });
  }
}

// Delete an existing product by ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("_id");

    if (!id) {
      return new Response("Missing product ID", { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting product", { status: 500 });
  }
}
