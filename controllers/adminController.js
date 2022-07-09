const productsRepository = require('../data/repositories/productsRepository');
const productsService = require('../services/productsService');

module.exports = {
	deleteProduct,
	getAddProduct,
	postAddProduct,
	getEditProductForm,
	postEditProductForm,
	productsOverview,
}

async function deleteProduct(req, res) {
	const id = parseInt(req.body.id);
	await productsRepository.deleteProduct(id);
	res.redirect('/');
}

function getAddProduct(req, res) {
	const viewModel = productsService.createAddProductFormViewModel();
	res.render('admin/product-info-form', viewModel);
}

async function postAddProduct(req, res) {
	const authorId = undefined;
	await productsRepository.addProduct(productsService.createNewProductViewModel(req.body, authorId))
	res.redirect('/')
}

function getEditProductForm(req, res) {
	const viewModel = productsService.createEditProductFormViewModel(req.query)
	console.log(viewModel)
	res.render('admin/product-info-form', viewModel);
}

async function postEditProductForm(req, res) {
	await productsRepository.editProduct(productsService.createProductViewModel(req.body))
	res.redirect('/')
}

async function productsOverview(req, res) {
	const docTitle = "Admin | Products overview";
	const path = "/admin/products-overview";
	const userId = req.app.get('user').id

	const products = await productsRepository.fetchAllUserProducts(userId);
	const viewModel = productsService.createUserProductsOverviewViewModel(docTitle, path, products)

	res.render('admin/products-overview', viewModel);
}