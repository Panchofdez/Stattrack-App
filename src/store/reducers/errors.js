const errors = (state = { error: null }, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, error: action.error };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export default errors;
