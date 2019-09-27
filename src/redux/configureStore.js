import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import gallery from "./modules/gallery";

export const reducer = combineReducers({
  gallery
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
}
