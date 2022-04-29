import {IAdminOrderDto} from "../types/dtosTypes";

const OrderDto = require('./orderDto')

module.exports = // @ts-ignore
    class AdminOrderDto extends OrderDto implements IAdminOrderDto {
        email;
        firstname;
        lastname;
        adminStatus;

        constructor(model: any) {
            super(model)
            this.email = model.email;
            this.firstname = model.firstname || "";
            this.lastname = model.lastname || "";
            this.adminStatus = model.adminStatus;
        }
    }