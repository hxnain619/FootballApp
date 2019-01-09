import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import matchsReducer from "../reducers/matchs";
import playerReducer from "../reducers/player";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      matchs: matchsReducer,
      auth: authReducer,
      player: playerReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
