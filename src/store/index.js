import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers/";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

const store = createStore(rootReducers, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;
