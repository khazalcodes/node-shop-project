const productsRepository = require('../data/repositories/productsRepository');
const productFactory = require('../models/factories/productFactory');
const productsService = require('../services/productsService');

module.exports = {
	getAddProduct,
	postAddProduct,
	getEditProduct,
	postEditProduct,
	productsOverview,
}

function getAddProduct(req, res) {
	res.render('admin/product-info-form', {
		docTitle: 'Add a product', 
		path: '/admin/add-product'
	});
}

function postAddProduct(req, res) {
	productsRepository.saveProduct(productFactory.createProduct(req)); 

	res.redirect('/');
}

function getEditProduct(req, res) {
	const editMode = req.query.edit

	if (editMode !== "true") {
		return res.redirect('/');
	}

	res.render('admin/product-info-form', {
		docTitle: 'Edit product',
		path: '/admin/edit-product',
		editMode: editMode
	});
}

function postEditProduct(req, res) {
	productsRepository.saveProduct(productFactory.createProduct(req));

	res.redirect('/');
}

function productsOverview(req, res) {
	const docTitle = "Admin | Products overview";
	const path = "/admin/products-overview";

	productsService.createProductsOverviewViewModel(docTitle, path, (viewModel) => {
		res.render('admin/products-overview', viewModel);
	});
}