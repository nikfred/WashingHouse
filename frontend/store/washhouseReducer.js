const defaultState = {
    washhouses: [],
    selectedWashhouses: null,
    selectedServices: [],
    total: 0,
}

const SET_WASHHOUSES = 'SET_WASHHOUSES'
const SELECT_WASHHOUSE = 'SET_WASHHOUSES'
const SELECT_SERVICE = 'SELECT_SERVICE'
const REMOVE_SERVICE = 'REMOVE_SERVICE'
const CLEAR_SELECTED = 'CLEAR_SELECTED'

export const washhouseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_WASHHOUSES:
            return {...state, washhouses: action.payload}
        case SELECT_SERVICE:
            return {
                ...state,
                selectedServices: [...state.selectedServices, action.payload._id],
                total: state.total += action.payload.price
            }
        case REMOVE_SERVICE:
            return {
                ...state,
                selectedServices: state.selectedServices.filter(i => i !== action.payload._id),
                total: state.total -= action.payload.price
            }
        case CLEAR_SELECTED:
            return {...state, selectedServices: [], total: 0}
        default:
            return state
    }
}

export const setWashhousesAction = (payload) => ({type: SET_WASHHOUSES, payload})
export const selectWashhouseAction = (payload) => ({type: SELECT_WASHHOUSE, payload})
export const selectServiceAction = (payload) => ({type: SELECT_SERVICE, payload})
export const removeServiceAction = (payload) => ({type: REMOVE_SERVICE, payload})
export const clearSelectedAction = () => ({type: CLEAR_SELECTED})