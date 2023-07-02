const initialState = {
  movies: [],
  loading: false,
  error: null,
  actorName: "",
  totalPages: 0,
  currentPage: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        actorName: action.actorName,
        totalPages: action.totalPages,
        currentPage: action.currentPage
      };
    case "FETCH_MORE_MOVIES_SUCCESS":
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        loading: false,
        currentPage: action.currentPage
      };
    case "FETCH_MOVIES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_ACTOR_NAME":
      return {
        ...state,
        actorName: action.payload,
        movies: [],
        totalPages: 0,
        currentPage: 0,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
