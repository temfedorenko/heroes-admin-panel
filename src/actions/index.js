export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroRemoved = (id) => {
  return {
    type: "HERO_REMOVED",
    payload: id,
  };
};

export const heroAdded = (hero) => {
  return {
    type: "HERO_ADDED",
    payload: hero,
  };
};
