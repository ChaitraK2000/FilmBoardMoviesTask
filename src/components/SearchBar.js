import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../actions";
import "./SearchBar.css";

const SearchBar = () => {
  const [actorName, setActorName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setActorName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedActorName = actorName.trim();
    if (trimmedActorName === "") {
      setError("Please enter the actor's name");
    } else {
      dispatch(searchMovies(trimmedActorName));
      setError("");
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-card">
        <div className="input-container">
          <label htmlFor="actorName">Please Enter Hero Name:</label>
          <input
            type="text"
            id="actorName"
            value={actorName}
            onChange={handleInputChange}
            placeholder="Enter actor's name"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
