const {CartOverviewViewModel} = require("../viewmodels/CartOverviewViewModel");
const {CartLineViewModel} = require("../viewmodels/CartLineViewModel");

module.exports = {
    createCartOverviewViewModel,
}

async function createCartOverviewViewModel(cart) {
    const viewModel = new CartOverviewViewModel();

    return viewModel;
}