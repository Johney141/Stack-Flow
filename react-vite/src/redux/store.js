import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import tagReducer from "./tags";
import questionReducer from "./questions";
import answersReducer from "./answers";
import followingsReducer from "./following";
import usersReducer from "./users";

const rootReducer = combineReducers({
  session: sessionReducer,
  tagState: tagReducer,
  questionState: questionReducer,
  answerState: answersReducer,
  followingState: followingsReducer,
  userState: usersReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
