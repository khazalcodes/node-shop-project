const cartRepository = require('../data/repositories/cartRepository');
const cartService = require("../services/cartService");
const orderRepository = require('../data/repositories/ordersRepository');
const productsService = require("../services/productsService");

const productsRepository = require('../data/repositories/productsRepository');

module.exports = {
	cart,
	index,
	products,
	addProductToCart,
	completeOrder,
	fetchProductDetails,
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
	const userId = req.app.get('user').id
	const cart = await cartRepository.fetchCart(userId)
	console.log(cart)
	const cartOverviewViewModel = cartService.createCartOverviewViewModel(cart)
	console.log(cartOverviewViewModel)

	res.render('shop/cart', cartOverviewViewModel)
}

async function completeOrder(req, res) {
	const userId = req.app.get('user').id;
	const cartLines = JSON.parse(req.body.cartLines)
	await orderRepository.createOrder(userId, cartLines);

	res.redirect('/user/orders-overview')
}

async function addProductToCart(req, res) {
	const userId = req.app.get('user').id;
	const product = req.body;

	await cartRepository.addProductToCart(userId, product);
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
	const viewModel = productsService.createProductDetailsViewModel(req.query);
	res.render('shop/product-details', viewModel);
}

async function fetchProductDetails(req, res) {
	const id = parseInt(req.query.productId);

	const product = await productsRepository.fetchProduct(id);
	const viewModel = productsService.createProductDetailsViewModel(product)

	res.render('shop/product-details', viewModel);
}