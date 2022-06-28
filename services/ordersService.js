const {OrdersOverviewViewModel} = require('../viewmodels/OrdersOverviewViewModel');
const {OrderViewModel} = require('../viewmodels/OrderViewModel');
const {OrderLineViewModel} = require('../viewmodels/OrderLineViewModel');

module.exports = {
    createOrdersViewModel
}

function createOrdersViewModel(orders) {
    const viewModel = new OrdersOverviewViewModel();

    viewModel.hasOrders = orders.length > 0;
    if (!viewModel.hasOrders) return viewModel;

    viewModel.orders = _convertOrdersToOrderViewModels(orders);

    return viewModel;
}

function _convertOrdersToOrderViewModels(orders) {
    const orderViewModels = []

    orders.forEach(o => {
        const viewModel = new OrderViewModel();
        const orderLineViewModels = _convertOrderLinesToOrderLineViewModels(o.orderLines);

        viewModel.orderLines = orderLineViewModels;
        viewModel.sumTotal = _sumOrderLineViewModelsTotalPrices(orderLineViewModels);

        orderViewModels.push(viewModel);
    })

    return orderViewModels;
}

function _convertOrderLinesToOrderLineViewModels(orderLines) {
    const orderViewModels = []

    orderLines.forEach(ol => {
        const viewModel = new OrderLineViewModel();
        const price = ol.product.price;
        const quantity = ol.quantity;

        viewModel.orderId = ol.orderId;
        viewModel.quantity = ol.quantity;
        viewModel.productId = ol.product.id;
        viewModel.productTitle = ol.product.title;
        viewModel.totalPrice = quantity * price;
        viewModel.unitPrice = price;

        orderViewModels.push(viewModel);
    })

    return orderViewModels;
}
function _sumOrderLineViewModelsTotalPrices(cartLineViewModelsArray) {
    return cartLineViewModelsArray
        .reduce(((x, { totalPrice }) => x + totalPrice), 0.0)
        .toFixed(2);
}
