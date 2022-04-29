import {createStore, combineReducers, applyMiddleware} from "redux";
import {userReducer} from "./userReducer";
import {washhouseReducer} from "./washhouseReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {HYDRATE} from "next-redux-wrapper";

export const rootReducer = combineReducers({
    user: userReducer,
    washhouse: washhouseReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>

// export const store = createStore(rootReducer)