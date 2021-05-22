import React from 'react';

const SearchForm = ({ value, handleChange }) => (
  <form className="search-box">
    <input
      type="search"
      placeholder="Search item"
      aria-label="search-box"
      className="form-field search-box"
      value={value}
      onChange={handleChange}
    />
  </form>
);

export default SearchForm;
