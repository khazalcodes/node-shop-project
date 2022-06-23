const {CartProductEntry} = require("../models/ProductEntry");
const cartRepository = require("../data/repositories/cartRepository");
const {CartOverviewViewModel} = require("../viewmodels/CartOverviewViewModel");
const {CartLineViewModel} = require("../viewmodels/CartLineViewModel");

module.exports = {
    createCartOverviewViewModel,
}

async function createCartOverviewViewModel(docTitle, path) {
    const viewModel = new CartOverviewViewModel();

    viewModel.docTitle = docTitle
    viewModel.path = path;

    return viewModel;
}