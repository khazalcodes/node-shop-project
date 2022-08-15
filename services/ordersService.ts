import {Order} from "../data/models/Order";
import {OrderLine} from "../data/models/OrderLine";

const {OrdersOverviewViewModel} = require('../viewmodels/OrdersOverviewViewModel');
const {OrderViewModel} = require('../viewmodels/OrderViewModel');
const {OrderLineViewModel} = require('../viewmodels/OrderLineViewModel');

module.exports = {
    createOrdersViewModel
}

function createOrdersViewModel(orders: Order[]) {
    const viewModel = new OrdersOverviewViewModel();

    viewModel.hasOrders = orders.length > 0;
    if (!viewModel.hasOrders) return viewModel;

    viewModel.orders = _convertOrdersToOrderViewModels(orders);

    return viewModel;
}

function _convertOrdersToOrderViewModels(orders: Order[]) {
    const orderViewModels: Order[] = []

    orders.forEach(o => {
        const viewModel = new OrderViewModel();
        const orderLineViewModels = _convertOrderLinesToOrderLineViewModels(o.orderLines);

        viewModel.id = o._id;
        viewModel.orderLines = orderLineViewModels;
        viewModel.sumTotal = _sumOrderLineViewModelsTotalPrices(orderLineViewModels);
        viewModel.date =  _getFormattedDate(o.timestamp);

        orderViewModels.push(viewModel);
    })

    return orderViewModels;
}

function _convertOrderLinesToOrderLineViewModels(orderLines: OrderLine[]) {
    const orderViewModels: any = []

    console.log(orderLines)
    orderLines.forEach(ol => {
        const viewModel = new OrderLineViewModel();

        viewModel.quantity = ol.quantity;
        viewModel.productId = ol.productId;
        viewModel.productTitle = ol.productTitle;
        viewModel.totalPrice = ol.totalPrice;
        viewModel.unitPrice = ol.unitPrice;

        orderViewModels.push(viewModel);
    })

    return orderViewModels;
}
function _sumOrderLineViewModelsTotalPrices(cartLineViewModelsArray: any) {
    return cartLineViewModelsArray
        .reduce(((x: any, { totalPrice }: any) => x + totalPrice), 0.0)
        .toFixed(2);
}

function _getFormattedDate(date: any) {
    return ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
    date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
}
