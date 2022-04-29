import {all} from "redux-saga/effects"
import {washhouseWatcher} from "./washhouseSaga";

export function* rootWatcher() {
    yield all([washhouseWatcher()])
}