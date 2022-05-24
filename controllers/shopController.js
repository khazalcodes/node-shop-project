const productsRepository = require('../data/repositories/productsRepository');

module.exports = {
	cart,
	index,
	orders,
	products,
}

function index(req, res, next) {
	res.render('shop/index', {
		docTitle: 'Shop',
		path: "/shop",
	})
}

function cart(req, res, next) {
	res.render('shop/cart', {
		docTitle: 'Cart',
		path: "/shop/cart",
	})
}

function orders(req, res, next) {
	res.render('shop/orders', {
		docTitle: 'Your Orders',
		path: "/shop/orders",
	})
}

function products(req, res, next) {
	productsRepository.fetchAll((products) => {
		res.render('shop/products', {
			docTitle: 'Shop',
			hasProducts: products.length > 0,
			path: "/shop/products",
			products: products, 
		});
	});
}