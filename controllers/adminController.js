const productsRepository = require('../data/repositories/productsRepository');
const productsService = require('../services/productsService');
const { ProductInfoFormViewModel } = require("../viewmodels/ProductInfoFormViewModel");
const productsHub = require("../pub-sub-messaging/hubs/productsHub");

module.exports = {
	deleteProduct,
	getAddProduct,
	postAddProduct,
	getEditProductForm,
	postEditProductForm,
	productsOverview,
}

function deleteProduct(req, res) {
	const id = req.body.id;

	productsRepository.deleteProduct(id);
	productsHub.publishDeletProductEvent(id)
	res.redirect('/');
}

function getAddProduct(req, res) {
	const viewModel = new ProductInfoFormViewModel();

	viewModel.docTitle = 'Add a product';
	viewModel.path = '/admin/add-product';
	viewModel.submitButtonText = 'Add Product';
	viewModel.postPath = viewModel.path;

	res.render('admin/product-info-form', viewModel);
}

function postAddProduct(req, res) {
	productsRepository.addProduct(productsService.createNewProduct(req));
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
	productsRepository.editProduct(productsService.createProductViewModel(req.body))
	res.redirect('/');
}


function productsOverview(req, res) {
	const docTitle = "Admin | Products overview";
	const path = "/admin/products-overview";

	productsService.createProductsOverviewViewModel(docTitle, path, (viewModel) => {
		res.render('admin/products-overview', viewModel);
	});
}