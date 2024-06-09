import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { leaderboardReducer } from "./leaderboardReducer";

const store = createStore(
  combineReducers({
    leaderboard: leaderboardReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
