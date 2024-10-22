import React, { useState } from "react";
import Search from "../../components/Searchbar/Search";
import Tool from "../../components/Tool/Tool";
import "./Home.css";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to store the search input

  const toolNames = ["Texter"]; // List of tools

  // Filter the tools based on searchQuery
  const filteredTools = toolNames.filter(
    (tool) => tool.toLowerCase().includes(searchQuery) // Return only tools matching the search
  );

  return (
    <div className="home">
      <Search setSearchQuery={setSearchQuery} /> {/* Search input component */}
      <div className="tools">
        {filteredTools.map((tool, index) => (
          <Tool key={index} name={tool} /> // Show filtered tools
        ))}
      </div>
    </div>
  );
};

export default Home;
