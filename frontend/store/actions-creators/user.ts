import {IUser, UserAction, UserActionTypes} from "../../types/user";


export const setUser = (payload: IUser): UserAction => {
    return {type: UserActionTypes.SET_USER, payload}
}

export const logoutAction = (): UserAction => {
    return {type: UserActionTypes.LOGOUT}
}