import {IOrderDto} from "../types/dtosTypes";

module.exports = class OrderDto implements IOrderDto{
    id;
    uid;
    washhouse_id;
    address;
    total;
    status;
    date;
    cancelReason;

    constructor(model: any) {
        this.id = model._id;
        this.uid = model.uid;
        this.washhouse_id = model.washhouse_id;
        this.address = model.address;
        this.total = model.total;
        this.status = model.status;
        this.date = model.date;
        this.cancelReason = model.cancelReason;
    }
}