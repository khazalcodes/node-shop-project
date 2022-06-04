const cartRepository = require('../data/repositories/cartRepository');
const productsService = require("../services/productsService");
const {ProductDetailsViewModel} = require("../viewmodels/ProductDetailsViewModel");
const cartService = require("../services/cartService");

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
	const docTitle = 'Cart Overview';
	const path = "/shop/cart";

	cartService.createCartOverviewViewModel(docTitle, path, (viewModel) => {
		res.render('shop/cart', viewModel);
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
	const product = req.body;
	const cartProductEntry = cartService.createProductEntry(product);
	cartRepository.addProduct(cartProductEntry);
	res.redirect('/');
}

function productDetails(req, res) {
	const productViewModel = productsService.createProductViewModel(req.query);
	const viewModel = new ProductDetailsViewModel()

	viewModel.product = productViewModel;
	viewModel.docTitle = `${viewModel.product.title} | Overview`;
	viewModel.path = '/shop/product-details';

	res.render('shop/product-details', viewModel);
}