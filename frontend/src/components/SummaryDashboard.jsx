import React from "react";
import "./SummaryDashboard.css";

const SummaryDashboard = ({ orders }) => {
  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const completed = orders.filter(o => o.status === "Completed").length;

  return (
    <div className="summary-dashboard">
      <div className="summary-card total">
        <h3>Total Orders</h3>
        <p>{total}</p>
      </div>
      <div className="summary-card pending">
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>
      <div className="summary-card completed">
        <h3>Completed</h3>
        <p>{completed}</p>
      </div>
    </div>
  );
};

export default SummaryDashboard;