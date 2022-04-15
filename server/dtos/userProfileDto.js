const UserDto = require('./userDto')

module.exports = class UserProfileDto extends UserDto{
    firstname;
    lastname;
    balance;

    constructor(model) {
        super(model)
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.balance = model.balance || 0;
    }
}