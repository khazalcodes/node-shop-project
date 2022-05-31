const productsRepository = require('../data/repositories/productsRepository');
const productFactory = require('../models/factories/productFactory');
const productsService = require('../services/productsService');
const { ProductInfoFormViewModel } = require("../viewmodels/ProductInfoFormViewModel");

module.exports = {
	getAddProduct,
	postAddProduct,
	getEditProductForm: getEditProductForm,
	postEditProductForm,
	productsOverview,
}

function getAddProduct(req, res) {
	const viewModel = new ProductInfoFormViewModel();

	viewModel.docTitle = 'Add a product';
	viewModel.path = 'admin/add-product';
	viewModel.submitButtonText = 'Add Product';
	viewModel.postPath = viewModel.path;

	res.render('admin/product-info-form', viewModel);
}

function postAddProduct(req, res) {
	productsRepository.saveProduct(productFactory.createProduct(req)); 

	res.redirect('/');
}

function getEditProductForm(req, res) {
	const productViewModel = productsService.createProductViewModel(req.query)
	const viewModel = new ProductInfoFormViewModel();

	viewModel.docTitle = 'Edit Product';
	viewModel.path = '/admin/edit-product';
	viewModel.submitButtonText = 'Update details'
	viewModel.postPath = viewModel.path
	viewModel.product = productViewModel;

	res.render('admin/product-info-form', viewModel);
}

function postEditProductForm(req, res) {
	console.log(req.body)
	productsRepository.findById(req.body.id, product => {

	})
	productsRepository.updateProduct();

	res.redirect('/');
}

function productsOverview(req, res) {
	const docTitle = "Admin | Products overview";
	const path = "/admin/products-overview";

	productsService.createProductsOverviewViewModel(docTitle, path, (viewModel) => {
		res.render('admin/products-overview', viewModel);
	});
}