const productsRepository = require('../data/repositories/productsRepository');
const cartRepository = require('../data/repositories/cartRepository');
const productsService = require("../services/productsService");

module.exports = {
	cart,
	index,
	orders,
	products,
	addProductToCart,
	productDetails,
}

function index(req, res) {
	res.render('shop/index', {
		docTitle: 'Shop',
		path: "/shop",
	})
}

function cart(req, res) {
	res.render('shop/cart', {
		docTitle: 'Cart',
		path: "/shop/cart",
	})
}

function orders(req, res) {
	res.render('shop/orders', {
		docTitle: 'Your Orders',
		path: "/shop/orders",
	})
}

function products(req, res) {
	const docTitle = 'Shop';
	const path = '/shop/products';

	productsService.createProductsOverviewViewModel(docTitle, path, (viewModel) => {
		res.render('shop/products', viewModel);
	});
}

function addProductToCart(req, res) {
	const productId = req.body.productId;
	const title = req.body.title;
	const price= req.body.price;

	cartRepository.addProduct(productId, title, price);
	res.redirect('/');
}

function productDetails(req, res) {
	const id = req.params.id
	productsRepository.findById(id, (product) => {
		res.render('shop/product-details', {
			docTitle: `${product.title} | Overview`,
			path: '/shop/product-details',
			product: product,			
		})
	});
}