import React from 'react';

const data = `
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
`;

const Page = () => {
  return (
    <div>page</div>
  );
};

export default Page;
