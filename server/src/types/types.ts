import {Types, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: 'USER' | 'ADMIN';
    balance: number;
    recoveryCode?: string;
    recoveryEnding?: Date;
}

export interface IService extends Document {
    name: string;
    price: number;
}

export interface IWashhouse extends Document {
    address: string;
    description: string;
    images: Types.Array<string>;
}

export interface IWashhouseAndService extends Document {
    // washhouse_id: Types.ObjectId;
    // service_id: Types.ObjectId;
    washhouse_id: IWashhouse["_id"];
    service_id: IService["_id"];

}

export interface IOrder extends Document {
    // uid: Types.ObjectId;
    // washhouse_id: Types.ObjectId;
    uid: IUser["_id"];
    washhouse_id: IWashhouse["_id"];
    total: number;
    status: string;
    adminStatus: string;
    date: Date;
    cancelReason?: string;
}

export interface IOrderItem extends Document {
    // order_id: Types.ObjectId;
    // service_id: Types.ObjectId;
    order_id: IOrder["_id"];
    service_id: IService["_id"];
}

export interface IToken extends Document {
    // uid: Types.ObjectId;
    uid: IUser["_id"];
    refreshToken: string;
}