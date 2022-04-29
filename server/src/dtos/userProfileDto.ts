import {IUserProfileDto} from "../types/dtosTypes";

const UserDto = require('./userDto')

module.exports = // @ts-ignore
    class UserProfileDto extends UserDto implements IUserProfileDto{
    firstname;
    lastname;
    balance;

    constructor(model: any) {
        super(model)
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.balance = model.balance || 0;
    }
}