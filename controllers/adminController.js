const productsRepository = require('../data/repositories/productsRepository');
const productFactory = require('../models/factories/productFactory');

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
	productsRepository.saveProduct(productFactory.createProduct(req)); 

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