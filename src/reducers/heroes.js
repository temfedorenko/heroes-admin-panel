const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "HERO_REMOVED":
      return {
        ...state,
        heroes: state.heroes.filter((item) => item.id !== action.payload),
      };
    case "HERO_ADDED":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    default:
      return state;
  }
};

export default heroes;
