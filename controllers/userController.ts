import ordersRepository from '../data/repositories/ordersRepository';
const ordersService = require('../services/ordersService');

module.exports = {
    ordersOverview
}

async function ordersOverview(req: any, res: any) {
    const userId = req.app.get('user').id;
    const orders = await ordersRepository.fetchUserOrders(userId);
    // console.log(orders)
    const viewModel = await ordersService.createOrdersViewModel(orders)
    res.render('user/orders', viewModel);
}
