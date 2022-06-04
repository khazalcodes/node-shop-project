const {CartProductEntry} = require("../models/ProductEntry");

module.exports = {
    createCartProductEntry: createProductEntry,
}

function createProductEntry(product) {
    const cartProductEntry = new CartProductEntry();

    cartProductEntry.productId = product.id;
    cartProductEntry.title = product.title;
    cartProductEntry.price = parseFloat(product.price);

    return cartProductEntry;
}