import React, { useState } from "react";
import axios from "axios";
import "./OrderForm.css";

const OrderForm = ({ refresh }) => {
  const [form, setForm] = useState({
    orderId: "",
    customerName: "",
    product: "",
    quantity: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { orderId, customerName, product, quantity } = form;

    if (!orderId || !customerName || !product || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", { 
        ...form,
        quantity: Number(form.quantity)
      });
      setForm({
        orderId: "",
        customerName: "",
        product: "",
        quantity: "",
        status: "Pending",
      });
      refresh();
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Error adding order: " + (error?.response?.data?.error || error.message));
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="orderId"
        value={form.orderId}
        onChange={handleChange}
        placeholder="Order ID"
      />
      <input
        type="text"
        name="customerName"
        value={form.customerName}
        onChange={handleChange}
        placeholder="Customer Name"
      />
      <input
        type="text"
        name="product"
        value={form.product}
        onChange={handleChange}
        placeholder="Product Ordered"
      />
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        min="1"
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;