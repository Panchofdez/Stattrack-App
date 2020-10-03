const initialState = [];

const players = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PLAYER_PROFILES":
      return [...action.playerProfiles];
    case "ADD_PLAYER_PROFILE":
      return [...state, action.playerProfile];
    default:
      return state;
  }
};

export default players;
