import {IUserDto} from "../types/dtosTypes";

module.exports = class UserDto implements IUserDto{
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';

    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.role = model.role || "USER";
    }
}