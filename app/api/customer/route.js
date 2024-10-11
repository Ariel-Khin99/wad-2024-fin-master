import Customer from "@/models/Customer";
import mongoose from "mongoose";

// Connect to the database
async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

// Fetch all customers
export async function GET() {
  try {
    await connectDB();
    const customers = await Customer.find();
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return new Response("Error fetching customers", { status: 500 });
  }
}

// Add a new customer
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const customer = new Customer(body);
    await customer.save();
    return new Response(JSON.stringify(customer), { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return new Response("Error creating customer", { status: 500 });
  }
}

// Update an existing customer by ID
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return new Response("Error updating customer", { status: 500 });
  }
}

// Partially update a customer (PATCH)
export async function PATCH(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return new Response("Error updating customer", { status: 500 });
  }
}

// Delete a customer by ID
export async function DELETE(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const id = url.searchParams.get("_id");

    if (!id) {
      return new Response("Missing customer ID", { status: 400 });
    }

    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }

    return new Response("Customer deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return new Response("Error deleting customer", { status: 500 });
  }
}
