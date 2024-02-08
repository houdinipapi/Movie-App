import React from "react";
import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";


const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=54704f26";


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Call the function when the component mounts and whenever the `searchTerm` changes
    searchMovies("Matrix");
  }, []);



  return (
    <div className="app">
      <h1>Movie App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <img
          src={SearchIcon}
          alt="Search icon"
          onClick={() => searchMovies(searchTerm)}
        />

      </div>

      {
        movies?.length > 0
          ? (
              <div className="container">
                {movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
              </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
