import {put, takeEvery, call} from "redux-saga/effects"
import {fetchAllWashhouses} from "../../http/washhouseAPI";
import {setWashhouses} from "../actions-creators/washhouse";
import {WashhouseActionType} from '../../types/washhouse'


function* fetchWashhouseWorker() {
    const data = yield call(fetchAllWashhouses)
    yield put(setWashhouses(data))
}

export function* washhouseWatcher() {
    yield takeEvery(WashhouseActionType.FETCH_WASHHOUSES, fetchWashhouseWorker)
}