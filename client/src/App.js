import React, { useState } from "react";
import "./App.css";
import Inputs from "./components/Inputs/Inputs";
import Saved from "./components/Saved/Saved";
import QuerySearch from "./components/QuerySearch/QuerySearch";

function App() {
  const basename = process.env.REACT_APP_BASENAME || null;
  const [query, setQuery] = useState("");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">URL Shortener</h1>
      </header>
      <div className="main-content">
        <div className="inputs-section">
          <Inputs />
        </div>
        <div className="saved-section">
          <div className="query-search">
            <QuerySearch handleChange={setQuery} />
          </div>
          <div className="saved-list">
            <Saved query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
