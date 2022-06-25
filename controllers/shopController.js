const cartRepository = require('../data/repositories/cartRepository');
const cartService = require("../services/cartService");
const productsService = require("../services/productsService");

const productsRepository = require('../data/repositories/productsRepository');

module.exports = {
	cart,
	index,
	orders,
	products,
	addProductToCart,
	removeProductFromCart,
	productDetails,
}

function index(req, res) {
	res.render('shop/index', {
		docTitle: 'Shop',
		path: "/shop",
	})
}

async function cart(req, res) {
	const cartId = req.app.get('user').cart.id
	const cart = await cartRepository.fetchCart(cartId)

	const viewModel = cartService.createCartOverviewViewModel(cart);
	res.render('shop/cart', viewModel);
}

function orders(req, res) {
	res.render('shop/orders', {
		docTitle: 'Your Orders',
		path: "/shop/orders",
	})
}

async function addProductToCart(req, res) {
	const cartId = req.app.get('user').cart.id;
	const productId = parseInt(req.body.id);

	await cartRepository.addProductToCart(cartId, productId);
	res.redirect('/');
}

async function removeProductFromCart(req, res) {
	const productId = parseInt(req.body.productId);
	const cartId = parseInt(req.body.cartId);

	await cartRepository.removeProductFromCart(cartId, productId);
	res.redirect('/shop/cart');
}

async function products(req, res) {
	const docTitle = 'Shop';
	const path = '/shop/products';
	const userId = req.app.get('user').id

	const products = await productsRepository.fetchAllUserProducts(userId);
	const viewModel = productsService.createUserProductsOverviewViewModel(docTitle, path, products)

	res.render('shop/products', viewModel)
}

function productDetails(req, res) {
	const viewModel = productsService.createProductViewModel(req.query);
	res.render('shop/product-details', viewModel);
}