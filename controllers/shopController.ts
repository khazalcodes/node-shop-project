const cartRepository = require('../data/repositories/cartRepository');
const cartService = require("../services/cartService");
import ordersRepository from '../data/repositories/ordersRepository'
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

function index(req: any, res: any) {
	res.render('shop/index', {
		docTitle: 'Shop',
		path: "/shop",
	})
}

async function cart(req: any, res: any) {
	const userId = req.app.get('user').id
	const cart = await cartRepository.fetchCart(userId)
	const cartOverviewViewModel = cartService.createCartOverviewViewModel(cart)

	res.render('shop/cart', cartOverviewViewModel)
}

async function completeOrder(req: any, res: any) {
	const userId = req.app.get('user').id;
	const cartLines = cartService.deserializeCartLinesInFormSubmission(req.body.cartLines)

	await ordersRepository.createOrder(userId, cartLines);

	res.redirect('/user/orders-overview')
}

async function addProductToCart(req: any, res: any) {
	const userId = req.app.get('user').id;
	const product = req.body;

	await cartRepository.addProductToCart(userId, product);
	res.redirect('/');
}

async function removeProductFromCart(req: any, res: any) {
	const userId = req.app.get('user').id;
	const productId = req.body.productId;

	await cartRepository.removeProductFromCart(userId, productId);

	res.redirect('/shop/cart');
}

async function products(req: any, res: any) {
	const docTitle = 'Shop';
	const path = '/shop/products';
	const userId = req.app.get('user').id

	const products = await productsRepository.fetchAllUserProducts(userId);
	const viewModel = productsService.createUserProductsOverviewViewModel(docTitle, path, products)

	res.render('shop/products', viewModel)
}

function productDetails(req: any, res: any) {
	const viewModel = productsService.createProductDetailsViewModel(req.query);
	res.render('shop/product-details', viewModel);
}

async function fetchProductDetails(req: any, res: any) {
	const id = parseInt(req.query.productId);

	const product = await productsRepository.fetchProduct(id);
	const viewModel = productsService.createProductDetailsViewModel(product)

	res.render('shop/product-details', viewModel);
}