import {ICartOverviewViewModel} from "../viewmodels/CartOverviewViewModel";
const {CartLineViewModel} = require("../viewmodels/CartLineViewModel");

module.exports = {
    createCartOverviewViewModel,
}

function createCartOverviewViewModel(cart: any): ICartOverviewViewModel {
    const cartLineViewModels = _convertCartLinesToCartLineViewModels(cart.cartLines);
    console.log("asd");

    return {
        docTitle: 'Cart Overview',
        path: 'shop/cart',
        cartLines: cartLineViewModels,
        hasCartLines: cart.cartLines.length > 0,
        sumTotal: _sumCartLineViewModelsTotalPrices(cartLineViewModels)
    }
}

function _convertCartLinesToCartLineViewModels(cartLines: any) {
    const cartLineViewModels: any[] = []

    cartLines.forEach((cl: any) => {
        const viewModel = new CartLineViewModel();
        const price = cl.product.price;
        const quantity = cl.quantity;

        viewModel.cartId = cl.cartId;
        viewModel.quantity = cl.quantity;
        viewModel.productId = cl.product.id;
        viewModel.productTitle = cl.product.title;
        viewModel.totalPrice = quantity * price;
        viewModel.unitPrice = price;

        cartLineViewModels.push(viewModel);
    })

    return cartLineViewModels;
}

function _sumCartLineViewModelsTotalPrices(cartLineViewModelsArray: any) {
    return cartLineViewModelsArray
        .reduce(((x: any, { totalPrice }: any) => x + totalPrice), 0.0)
        .toFixed(2);
}