const ordersRepository = require('../data/repositories/ordersRepository');
const ordersService = require('../services/ordersService');

module.exports = {
    ordersOverview
}

async function ordersOverview(req, res) {
    const userId = req.app.get('user').id;
    const orders = await ordersRepository.fetchUserOrders(userId);
    const viewModel = await ordersService.createOrdersViewModel(orders)
    res.render('user/orders', viewModel);
}
