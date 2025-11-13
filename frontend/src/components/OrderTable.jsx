import React from "react";
import axios from "axios";
import "./OrderTable.css";

const OrderTable = ({ orders, refresh }) => {
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
    refresh();
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      refresh();
    }
  };

  return (
    <div className="table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o._id}>
                <td>{o.orderId}</td>
                <td>{o.customerName}</td>
                <td>{o.product}</td>
                <td>{o.quantity}</td>
                <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`status-badge ${
                      o.status === "Completed" ? "completed" : "pending"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className="toggle-btn" onClick={() => toggleStatus(o._id, o.status)}>
                    Toggle
                  </button>
                  <button className="delete-btn" onClick={() => deleteOrder(o._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-orders">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;