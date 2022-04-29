export interface UserState {
    user: IUser | null
    isAuth: boolean
    isAdmin: boolean
}

export interface IUser {
    id: string
    email: string
    firstname: string
    lastname: string
    role: 'ADMIN' | 'USER'
    balance: number
}

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT'
}

interface SetUserAction {
    type: UserActionTypes.SET_USER
    payload: IUser
}

interface LogoutAction {
    type: UserActionTypes.LOGOUT
}

export type UserAction =
    SetUserAction
    | LogoutAction