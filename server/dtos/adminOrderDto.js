const OrderDto = require('./OrderDto')

module.exports = class AdminOrderDto extends OrderDto{
    email;
    firstname;
    lastname;
    adminStatus;

    constructor(model) {
        super(model)
        this.email = model.email;
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.adminStatus = model.adminStatus;
    }
}