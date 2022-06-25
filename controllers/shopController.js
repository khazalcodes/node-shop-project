const cartRepository = require('../data/repositories/cartRepository');
const cartService = require("../services/cartService");
const productsService = require("../services/productsService");

const {ProductDetailsViewModel} = require("../viewmodels/ProductDetailsViewModel");

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

async function products(req, res) {
	const docTitle = 'Shop';
	const path = '/shop/products';
	const userId = req.app.get('user').id

	const viewModel = productsService.createUserProductsOverviewViewModel(docTitle, path, userId)

	res.render('shop/products', viewModel)
}

async function addProductToCart(req, res) {
	const cartId = parseInt(req.app.get('user').cart.id) ;
	const productId = parseInt(req.body.id);

	await cartRepository.addProductToCart(cartId, productId);
	res.redirect('/');
}

async function removeProductFromCart(req, res) {
	const id = req.body.id;
	await cartRepository.removeProduct(id);
	res.redirect('/shop/cart');
}

function productDetails(req, res) {
	const productViewModel = productsService.createProductViewModel(req.query);
	const viewModel = new ProductDetailsViewModel()

	viewModel.product = productViewModel;
	viewModel.docTitle = `${viewModel.product.title} | Overview`;
	viewModel.path = '/shop/product-details';

	res.render('shop/product-details', viewModel);
}