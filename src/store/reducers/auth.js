const initialState = {
  token: null,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_TOKEN":
      return { token: action.token };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default currentUser;
