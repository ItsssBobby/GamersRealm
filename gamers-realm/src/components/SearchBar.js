import React from 'react';

function SearchBar({ search, setSearch }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search games"
      />
    </div>
  );
}

export default SearchBar;