import {IWashhouseDto} from "../types/dtosTypes";

module.exports = class WashhouseDto implements IWashhouseDto{
    id;
    address;
    description;
    images;

    constructor(model: any) {
        this.id = model._id;
        this.address = model.address;
        this.description = model.description || "";
        this.images = model.images.map((i: string) => process.env.API_URL + '/' + i);
    }
}