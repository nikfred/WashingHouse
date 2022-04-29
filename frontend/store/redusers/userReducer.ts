import {UserActionTypes, UserState} from "../../types/user";


const defaultState: UserState = {
    user: null,
    isAuth: false,
    isAdmin: false,
}

export const userReducer = (state = defaultState, action): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {...state, user: action.payload, isAuth: true, isAdmin: action.payload.role === 'ADMIN'}
        case UserActionTypes.LOGOUT:
            return {...state, user: null, isAuth: false, isAdmin: false}
        default:
            return state
    }
}

// export const setUserAction = (payload) => ({type: SET_USER, payload})
// export const logoutAction = (payload) => ({type: LOGOUT, payload})