// components/MovieList.js
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MovieList.css";
import { searchMovies } from "../actions";

const MovieList = () => {
  const movies = useSelector((state) => state.movies);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const actorName = useSelector((state) => state.actorName);
  const dispatch = useDispatch();

  const loadMoreMovies = useCallback(() => {
    const trimmedActorName = actorName ? actorName.trim() : "";
    if (trimmedActorName !== "") {
      dispatch(searchMovies(trimmedActorName));
    }
  }, [actorName, dispatch]);

  useEffect(() => {
    loadMoreMovies();
  }, [loadMoreMovies]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreMovies();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreMovies]);

  if (loading && movies.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <div>No movies found for the specified actor.</div>
      ) : (
        <>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MovieList;
