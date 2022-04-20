const defaultState = {
    user: {},
    isAuth: false,
    isAdmin: false,
}

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload, isAuth: true, isAdmin: action.payload.role === 'ADMIN'}
        case LOGOUT:
            return {...state, user: {}, isAuth: false, isAdmin: false}
        default:
            return state
    }
}

export const setUserAction = (payload) => ({type: SET_USER, payload})
export const logoutAction = (payload) => ({type: LOGOUT, payload})