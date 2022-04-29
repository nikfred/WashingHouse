export interface IUserDto {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
}

export interface IUserProfileDto extends IUserDto{
    firstname: string;
    lastname: string;
    balance: number;
}

export interface IOrderDto {
    id: string;
    uid: string;
    washhouse_id: string;
    address: string;
    total: number;
    status: string;
    date: Date;
    cancelReason?: string;
}

export interface IAdminOrderDto extends IOrderDto{
    email: string;
    firstname: string;
    lastname: string;
    adminStatus: string;
}

export interface IWashhouseDto {
    id: string;
    address: string;
    description?: string;
    images: Array<string>;
}