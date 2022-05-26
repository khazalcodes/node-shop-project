const productsRepository = require('../data/repositories/productsRepository');
const Cart = require('../models/Cart');

module.exports = {
	cart,
	index,
	orders,
	products,
	addProductToCart,
	productDetails,
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

function addProductToCart(req, res, next) {
	const productId = req.body.productId;
	const title = req.body.title;
	const price= req.body.price;

	Cart.addProduct(productId, title, price);
	res.redirect('/');
}

function productDetails(req, res, next) {
	const id = req.params.id
	productsRepository.findById(id, (product) => {
		res.render('shop/product-details', {
			docTitle: `${product.title} | Overview`,
			path: '/shop/product-details',
			product: product,			
		})
	});
}