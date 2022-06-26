const ordersRepository = require('../data/repositories/ordersRepository');
const ordersService = require('../services/ordersService');

module.exports = {
    ordersOverview
}

async function ordersOverview(req, res) {
    const userId = req.app.get('user').id;
    const orders = await ordersRepository.fetchUserOrders(userId);
    console.log(orders)
    res.redirect('/');
}
