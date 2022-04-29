import {IService, IWashhouse, WashhouseAction, WashhouseActionType} from "../../types/washhouse";

export const setWashhouses = (payload: Array<IWashhouse>): WashhouseAction => {
    return {type: WashhouseActionType.SET_WASHHOUSES, payload}
}

export const selectService = (payload: IService): WashhouseAction => {
    return {type: WashhouseActionType.SELECT_SERVICE, payload}
}

export const removeService = (payload: IService): WashhouseAction => {
    return {type: WashhouseActionType.REMOVE_SERVICE, payload}
}

export const clearSelected = (): WashhouseAction => {
    return {type: WashhouseActionType.CLEAR_SELECTED}
}

export const fetchWashhouses = (): WashhouseAction => {
    return {type: WashhouseActionType.FETCH_WASHHOUSES}
}