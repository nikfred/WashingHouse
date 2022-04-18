module.exports = class WashhouseDto{
    id;
    address;
    description;
    images;

    constructor(model) {
        this.id = model._id;
        this.address = model.address;
        this.description = model.description || "";
        this.images = model.images.map(i => process.env.API_URL + '/' + i);
    }
}