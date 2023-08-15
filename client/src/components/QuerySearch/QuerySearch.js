import React from "react";
import "./QuerySearch.css"; // Import your CSS for styling here

function QuerySearch(props) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    props.handleChange(inputValue);
  };

  return (
    <input
      className="query-search-input" // Apply CSS classes for styling
      type="text"
      placeholder="Search Code"
      onChange={handleInputChange}
    />
  );
}

export default QuerySearch;
