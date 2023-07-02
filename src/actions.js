import axios from "axios";

const API_KEY = "fee90a6c87d9740bf3337578cbbdfbaf";

export const searchMovies = (actorName, page) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_MOVIES_REQUEST" });

    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${actorName}`
      )
      .then((response) => {
        const actorId =
          response.data.results.length > 0 ? response.data.results[0].id : null;

        if (actorId) {
          dispatch({ type: "CLEAR_MOVIES" }); // Clear existing movie data
          axios
            .get(
              `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`
            )
            .then((response) => {
              const movies = response.data.cast;
              dispatch({
                type: "FETCH_MOVIES_SUCCESS",
                payload: movies,
                page,
              });
            })
            .catch((error) => {
              dispatch({
                type: "FETCH_MOVIES_FAILURE",
                payload: "Failed to fetch movies. Please try again.",
              });
            });
        } else {
          dispatch({
            type: "FETCH_MOVIES_FAILURE",
            payload: "No movies found for the specified actor.",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: "FETCH_MOVIES_FAILURE", payload: error.message });
      });
  };
};
