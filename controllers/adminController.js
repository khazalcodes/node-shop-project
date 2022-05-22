const productsRepository = require('../data/repositories/productsRepository');
const Product = require('../models/Product');

module.exports = {
	addProduct,
	viewAddProductForm,
}

function viewAddProductForm(req, res, next) {
	res.render('admin/add-product', {
		docTitle: 'Add a product', 
		path: '/admin/add-product'
	});
}

function addProduct(req, res, next) {
	productsRepository.saveProduct(new Product(req.body.title)); 
	res.redirect('/');
}	