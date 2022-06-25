const productsRepository = require('../data/repositories/productsRepository');
const {ProductsOverviewViewModel} = require('../viewmodels/ProductsOverviewViewModel');
const {ProductViewModel} = require("../viewmodels/ProductViewModel");
const {ProductInfoFormViewModel} = require('../viewmodels/ProductInfoFormViewModel');

module.exports = {
    createNewProductViewModel,
    createProductViewModel,
    createAddProductFormViewModel,
    createEditProductFormViewModel,
    createUserProductsOverviewViewModel,
}

function createNewProductViewModel(rawProductInfo, authorId) {
    const viewModel = new ProductViewModel();

    viewModel.title =  rawProductInfo.title;
    viewModel.imageUrl =  rawProductInfo.imageUrl;
    viewModel.description =  rawProductInfo.description;
    viewModel.price =  parseFloat(rawProductInfo.price);
    viewModel.authorId = authorId;

    return viewModel;
}

async function createUserProductsOverviewViewModel(docTitle, path, userId) {
    const products = await productsRepository.fetchAllUserProducts(userId);
    const viewModel = new ProductsOverviewViewModel();

    viewModel.docTitle = docTitle;
    viewModel.path = path;
    viewModel.products = _convertProductsToProductViewModels(products);
    viewModel.hasProducts = products.length > 0;

    return viewModel;
}

function createAddProductFormViewModel() {
    const viewModel = new ProductInfoFormViewModel();

    viewModel.docTitle = 'Add a product';
    viewModel.path = '/admin/add-product';
    viewModel.submitButtonText = 'Add Product';
    viewModel.postPath = viewModel.path;

    return viewModel
}

function createEditProductFormViewModel(product) {
    const productViewModel = createProductViewModel(product)
    const viewModel = new ProductInfoFormViewModel();

    viewModel.product = productViewModel;

    viewModel.docTitle = 'Edit Product';
    viewModel.path = '/admin/edit-product';
    viewModel.submitButtonText = 'Update details'
    viewModel.postPath = viewModel.path

    return viewModel
}

function createProductViewModel(rawProductInfo) {
    const viewModel = new ProductViewModel()

    viewModel.id = parseInt(rawProductInfo.id);
    viewModel.title = rawProductInfo.title;
    viewModel.imageUrl = rawProductInfo.imageUrl;
    viewModel.description = rawProductInfo.description;
    viewModel.price =  parseFloat(rawProductInfo.price);
    viewModel.authorId = rawProductInfo.authorId;

    return viewModel;
}

function _convertProductsToProductViewModels(products) {
    const productViewModels = {};

    products.forEach(p => {
        const viewModel = createProductViewModel(p);
        productViewModels[viewModel.id] = viewModel
    })

    return productViewModels;
}
