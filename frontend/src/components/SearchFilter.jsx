import React, { useState } from "react";
import "./SearchFilter.css";

const SearchFilter = ({ orders, setFiltered }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const handleFilter = (q = query, s = status) => {
    let results = orders;

    if (q.trim()) {
      results = results.filter(o =>
        o.customerName.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (s !== "All") {
      results = results.filter(o => o.status === s);
    }

    setFiltered(results);
  };

  const onQueryChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    handleFilter(q, status);
  };

  const onStatusChange = (e) => {
    const s = e.target.value;
    setStatus(s);
    handleFilter(query, s);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by Customer Name..."
        value={query}
        onChange={onQueryChange}
      />
      <select value={status} onChange={onStatusChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={() => handleFilter()}>Filter</button>
    </div>
  );
};

export default SearchFilter;