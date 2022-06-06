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

function createProductsOverviewViewModel(docTitle, path) {
    return productsRepository.fetchAll()
        .then(products => {
            const viewModel = new ProductsOverviewViewModel();
            console.log('shumblacalksnlsakjdf')
            viewModel.docTitle = docTitle;
            viewModel.path = path;
            viewModel.products = convertProductsToProductViewModels(products);
            viewModel.hasProducts = products.length > 0;

            console.log(viewModel)
            return viewModel;
        })
        .catch(err => console.log(err));
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
