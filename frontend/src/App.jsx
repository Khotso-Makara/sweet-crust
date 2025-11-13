import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";
import SearchFilter from "./components/SearchFilter";
import SummaryDashboard from "./components/SummaryDashboard";
import "./App.css";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sweet Crust Bakery - Order Management</h1>
      </header>

      <SummaryDashboard orders={filtered} />
      <SearchFilter orders={orders} setFiltered={setFiltered} />
      <OrderForm refresh={fetchOrders} />
      <OrderTable orders={filtered} refresh={fetchOrders} />
    </div>
  );
};

export default App;
