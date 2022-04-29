import {WashhouseActionType, WashhouseState} from "../../types/washhouse";

const defaultState: WashhouseState = {
    washhouses: [],
    selectedServices: [],
    total: 0,
}

export const washhouseReducer = (state = defaultState, action): WashhouseState => {
    switch (action.type) {
        case WashhouseActionType.SET_WASHHOUSES:
            return {...state, washhouses: action.payload}
        case WashhouseActionType.SELECT_SERVICE:
            return {
                ...state,
                selectedServices: [...state.selectedServices, action.payload._id],
                total: state.total += action.payload.price
            }
        case WashhouseActionType.REMOVE_SERVICE:
            return {
                ...state,
                selectedServices: state.selectedServices.filter(i => i !== action.payload._id),
                total: state.total -= action.payload.price
            }
        case WashhouseActionType.CLEAR_SELECTED:
            return {...state, selectedServices: [], total: 0}
        default:
            return state
    }
}