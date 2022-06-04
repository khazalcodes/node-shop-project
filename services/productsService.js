const productsRepository = require('../data/repositories/productsRepository');
const { ProductsOverviewViewModel } = require('../viewmodels/ProductsOverviewViewModel');
const { ProductViewModel } = require("../viewmodels/ProductViewModel");
const Product = require("../models/Product");

module.exports = {
    createNewProduct,
    createProductsOverviewViewModel,
    createProductViewModel,
}

function createNewProduct(request) {
    const product = new Product();
    product.title =  request.body.title;
    product.imageUrl =  request.body.imageUrl;
    product.description =  request.body.description;
    product.price =  request.body.price;
    product.id =  Math.random().toString();

    return product;
}

function createProductsOverviewViewModel(docTitle, path, callback) {
    productsRepository.fetchAll((products) => {
        const viewModel = new ProductsOverviewViewModel();

        viewModel.docTitle = docTitle;
        viewModel.path = path;
        viewModel.products = convertProductsToProductViewModels(products);
        viewModel.hasProducts = products.length > 0;

        return callback(viewModel);
    })
}

function convertProductsToProductViewModels(products) {
    const productViewModels = {};

    products.forEach(p => {
        const viewModel = createProductViewModel(p);
        productViewModels[viewModel.id] = viewModel
    })

    return productViewModels;
}

function createProductViewModel(product) {
    const viewModel = new ProductViewModel()

    viewModel.id = product.id;
    viewModel.title = product.title;
    viewModel.imageUrl = product.imageUrl;
    viewModel.description = product.description;
    viewModel.price =  parseFloat(product.price)

    return viewModel;
}
