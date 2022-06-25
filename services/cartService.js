const {CartOverviewViewModel} = require("../viewmodels/CartOverviewViewModel");
const {CartLineViewModel} = require("../viewmodels/CartLineViewModel");

module.exports = {
    createCartOverviewViewModel,
}

function createCartOverviewViewModel(cart) {
    const viewModel = new CartOverviewViewModel();

    const cartLineViewModels = _convertCartLinesToCartLineViewModels(cart.cartLines);

    viewModel.cartLines = cartLineViewModels;
    viewModel.hasCartLines = cart.cartLines.length > 0;
    viewModel.sumTotal = _sumCartLineViewModelsTotalPrices(cartLineViewModels);
    return viewModel;
}

function _convertCartLinesToCartLineViewModels(cartLines) {
    const cartLineViewModels = {}

    cartLines.forEach(cl => {
        const viewModel = new CartLineViewModel();
        const price = cl.product.price;
        const quantity = cl.quantity;

        console.log(price)
        console.log(quantity)

        viewModel.cartId = cl.cartId;
        viewModel.quantity = cl.quantity;
        viewModel.productId = cl.product.id;
        viewModel.productTitle = cl.product.title;
        viewModel.totalPrice = quantity * price;
        viewModel.unitPrice = price;

        cartLineViewModels[viewModel.cartId + "_" + viewModel.productId] = viewModel;
    })

    return cartLineViewModels;
}

function _sumCartLineViewModelsTotalPrices(cartLineViewModels) {
    return Object
        .values(cartLineViewModels)
        .reduce(((x, { totalPrice }) => x + totalPrice), 0.0)
        .toFixed(2);
}