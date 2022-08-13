import {CartOverviewViewModel} from "../viewmodels/CartOverviewViewModel";
import {Cart} from "../data/models/Cart";
import {ProductLine} from "../data/models/ProductLine";
import {CartLineViewModel} from "../viewmodels/CartLineViewModel";

module.exports = {
    createCartOverviewViewModel,
}

function createCartOverviewViewModel(cart: Cart): CartOverviewViewModel {
    let cartLineViewModels: CartLineViewModel[] = [];

    if (cart.cartLines) cartLineViewModels = _convertCartLinesToCartLineViewModels(cart.cartLines);

    return {
        docTitle: 'Cart Overview',
        path: 'shop/cart',
        cartLines: cartLineViewModels,
        hasCartLines: cartLineViewModels.length > 0,
        sumTotal: _sumCartLineViewModelsTotalPrices(cartLineViewModels)
    }
}

function _convertCartLinesToCartLineViewModels(cartLines: {[key: string]: ProductLine}): CartLineViewModel[] {
    const cartLineViewModels: CartLineViewModel[] = []

    let cl : any
    for (cl of Object.values(cartLines)) {
        const price = cl.product.price;
        const quantity = cl.quantity;

        let viewModel: CartLineViewModel = {
            quantity: cl.quantity,
            productId: cl.product.id,
            productTitle: cl.product.title,
            totalPrice: quantity * price,
            unitPrice: price,
        };

        cartLineViewModels.push(viewModel);
    }

    return cartLineViewModels;
}

function _sumCartLineViewModelsTotalPrices(cartLineViewModelsArray: any) {
    return cartLineViewModelsArray
        .reduce(((x: any, { totalPrice }: any) => x + totalPrice), 0.0)
        .toFixed(2);
}