import {createStore, combineReducers, applyMiddleware} from "redux";
import {userReducer} from "./userReducer";
import {washhouseReducer} from "./washhouseReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    user: userReducer,
    washhouse: washhouseReducer
})

export const store = createStore(rootReducer)