import {CartOverviewViewModel} from "../viewmodels/CartOverviewViewModel";
import {Cart} from "../data/models/Cart";
import {CartLine} from "../data/models/CartLine";
import {CartLineViewModel} from "../viewmodels/CartLineViewModel";
import {ObjectId} from "mongodb";

module.exports = {
    createCartOverviewViewModel,
    deserializeCartLinesInFormSubmission,
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

function deserializeCartLinesInFormSubmission(cartLines: any) {
    console.log(cartLines)
    const parsedCartLines = JSON.parse(cartLines);
    console.log(parsedCartLines)
    parsedCartLines.forEach((cl: any) => cl.productId = new ObjectId(cl.productId));
    return parsedCartLines;
}

function _convertCartLinesToCartLineViewModels(cartLines: {[key: string]: CartLine}): CartLineViewModel[] {
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