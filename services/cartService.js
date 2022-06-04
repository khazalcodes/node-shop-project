const {CartProductEntry} = require("../models/ProductEntry");
const cartRepository = require("../data/repositories/cartRepository");
const {CartOverviewViewModel} = require("../viewmodels/CartOverviewViewModel");

module.exports = {
    createProductEntry,
    createCartOverviewViewModel,
}

function createProductEntry(product) {
    const cartProductEntry = new CartProductEntry();

    cartProductEntry.productId = product.id;
    cartProductEntry.title = product.title;
    cartProductEntry.price = parseFloat(product.price);

    return cartProductEntry;
}

function createCartOverviewViewModel(docTitle, path, callback) {
    cartRepository.fetchCart((cart) => {
        const viewModel = new CartOverviewViewModel();

        viewModel.docTitle = docTitle;
        viewModel.path = path;
        viewModel.productEntries = cart.products;
        viewModel.hasProductEntries = Object.keys(viewModel.productEntries).length > 0;
        viewModel.totalPrice = cart.totalPrice;

        return callback(viewModel);
    })
}
