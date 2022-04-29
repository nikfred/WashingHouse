export interface WashhouseState {
    washhouses: Array<IWashhouse>,
    selectedServices: Array<string>,
     total: number,
}

export interface IWashhouse {
    id: string;
    address: string;
    description?: string;
    images: Array<string>;
}

export interface IService {
    _id: string;
    name: string;
    price: string;
}

export enum WashhouseActionType {
    FETCH_WASHHOUSES = 'FETCH_WASHHOUSES',
    SET_WASHHOUSES = 'SET_WASHHOUSES',
    SELECT_SERVICE = 'SELECT_SERVICE',
    REMOVE_SERVICE = 'REMOVE_SERVICE',
    CLEAR_SELECTED = 'CLEAR_SELECTED',
}

interface FetchWashhouses {
    type: WashhouseActionType.FETCH_WASHHOUSES
}

interface SetWashhouses {
    type: WashhouseActionType.SET_WASHHOUSES,
    payload: Array<IWashhouse>
}

interface SelectService {
    type: WashhouseActionType.SELECT_SERVICE,
    payload: IService
}

interface RemoveService {
    type: WashhouseActionType.REMOVE_SERVICE,
    payload: IService
}

interface ClearSelected {
    type: WashhouseActionType.CLEAR_SELECTED
}

export type WashhouseAction =
    SetWashhouses
    | SelectService
    | RemoveService
    | ClearSelected
    | FetchWashhouses

