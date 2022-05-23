const productsRepository = require('../data/repositories/productsRepository');
const Product = require('../models/Product');
const { products } = require('./shopController');

module.exports = {
	getAddProduct,
	postAddProduct,
	productsOverview
}

function getAddProduct(req, res, next) {
	res.render('admin/add-product', {
		docTitle: 'Add a product', 
		path: '/admin/add-product'
	});
}

function postAddProduct(req, res, next) {
	productsRepository.saveProduct(new Product(
		req.body.title,
		req.body.imageUrl,
		req.body.description,
		req.body.price
	)); 

	res.redirect('/');
}	

function productsOverview(req, res, next) {
	productsRepository.fetchAll((products) => {
		res.render('admin/products-overview', {
			docTitle: "Admin | Products overview",
			hasProducts: products.length > 0,
			path: "/admin/products-overview",
			products: products
		});
	})
}