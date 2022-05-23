const productsRepository = require('../data/repositories/productsRepository');

module.exports = {
	cart,
	index,
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