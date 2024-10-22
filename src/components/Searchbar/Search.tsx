import React from "react";
import "./Search.css";

// Simple props type definition
interface SearchProps {
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchQuery }) => {
  // This function handles the text input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase()); // Update the search query in lowercase
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a Tool"
        onChange={handleInputChange} // Calls the function whenever the user types
      />
    </div>
  );
};

export default Search;
