// create a makeStore function
import {createWrapper, MakeStore} from "next-redux-wrapper";
import {applyMiddleware, createStore, Store} from "redux";
import {reducer, RootState} from "./redusers";
import createSagaMiddleware from "@redux-saga/core";
import {rootWatcher} from "./saga";
import {composeWithDevTools} from "redux-devtools-extension";


const makeStore: MakeStore<RootState> = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

    store.sagaTask = sagaMiddleware.run(rootWatcher);

    return store
}

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {debug: true});