import { combineReducers } from "redux";
import game from "./game";
import errors from "./errors";
import auth from "./auth";
import players from "./players";
import gameHistory from "./gameHistory";

const rootReducer = combineReducers({
  game,
  errors,
  auth,
  players,
  gameHistory,
});

export default rootReducer;
