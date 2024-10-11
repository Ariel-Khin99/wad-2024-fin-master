import mongoose from "mongoose";

// Define the customer schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: String,
    required: true,
    unique: true // Ensures that each member number is unique
  },
  interests: {
    type: String, // You can change this to Array if you want to store multiple interests
    required: true
  }
});

// Create the Customer model, using the defined schema
const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
