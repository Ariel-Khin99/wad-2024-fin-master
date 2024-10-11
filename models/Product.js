import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true }, // Date of birth
  memberNumber: { type: String, required: true },
  interests: { type: String, required: false }, // Interests can be optional
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;
