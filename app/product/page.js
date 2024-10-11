"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, reset } = useForm();
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Handle editing of existing customer
  const startEdit = (customer) => () => {
    setEditMode(true);
    reset(customer);
  };

  // Fetch all customers from the API
  async function fetchCustomers() {
    const data = await fetch(`${APIBASE}/customer`);
    const c = await data.json();
    const customersWithId = c.map((customer) => ({ ...customer, id: customer._id }));
    setCustomers(customersWithId);
  }

  // Handle customer creation and updates
  const createOrUpdateCustomer = async (data) => {
    if (editMode) {
      const response = await fetch(`${APIBASE}/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert(`Failed to update customer: ${response.status}`);
      } else {
        alert("Customer updated successfully");
      }
      reset({ name: "", dob: "", memberNumber: "", interests: "" });
      setEditMode(false);
      fetchCustomers();
      return;
    }

    // Adding a new customer
    const response = await fetch(`${APIBASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      alert("Customer added successfully");
      reset({ name: "", dob: "", memberNumber: "", interests: "" });
      fetchCustomers();
    } catch (error) {
      alert(`Failed to add customer: ${error.message}`);
    }
  };

  // Handle customer deletion
  const deleteCustomerById = (id) => async () => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    const response = await fetch(`${APIBASE}/customer/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert(`Failed to delete customer: ${response.status}`);
    } else {
      alert("Customer deleted successfully");
    }
    fetchCustomers();
  };

  // Fetch customers when component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-center my-4">Customer Management</h1>

      {/* Customer Form (for adding and updating customers) */}
      <div className="flex justify-center">
        <div className="w-1/2">
          <form onSubmit={handleSubmit(createOrUpdateCustomer)}>
            <div className="grid grid-cols-2 gap-4 p-4 border rounded shadow">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-300 p-2"
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                name="dob"
                type="date"
                {...register("dob", { required: true })}
                className="border border-gray-300 p-2"
              />

              <label htmlFor="memberNumber">Member Number:</label>
              <input
                id="memberNumber"
                name="memberNumber"
                type="text"
                {...register("memberNumber", { required: true })}
                className="border border-gray-300 p-2"
              />

              <label htmlFor="interests">Interests:</label>
              <textarea
                id="interests"
                name="interests"
                {...register("interests")}
                className="border border-gray-300 p-2"
              ></textarea>

              <div className="col-span-2 text-center">
                {editMode ? (
                  <>
                    <input
                      type="submit"
                      value="Update Customer"
                      className="bg-blue-600 text-white py-2 px-4 rounded"
                    />
                    <button
                      onClick={() => {
                        reset({ name: "", dob: "", memberNumber: "", interests: "" });
                        setEditMode(false);
                      }}
                      className="ml-4 bg-gray-600 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <input
                    type="submit"
                    value="Add Customer"
                    className="bg-green-600 text-white py-2 px-4 rounded"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Customers List */}
      <div className="mt-8">
        <h2 className="text-2xl text-center">Customers List</h2>
        <div className="flex justify-center mt-4">
          <div className="w-3/4">
            {customers.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">DOB</th>
                    <th className="border border-gray-300 p-2">Member No</th>
                    <th className="border border-gray-300 p-2">Interests</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="border border-gray-300 p-2">{customer.name}</td>
                      <td className="border border-gray-300 p-2">{customer.dob}</td>
                      <td className="border border-gray-300 p-2">{customer.memberNumber}</td>
                      <td className="border border-gray-300 p-2">{customer.interests}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          className="bg-blue-600 text-white py-1 px-2 rounded mr-2"
                          onClick={startEdit(customer)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white py-1 px-2 rounded"
                          onClick={deleteCustomerById(customer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600">No customers available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
