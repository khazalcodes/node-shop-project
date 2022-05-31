const productsRepository = require('../data/repositories/productsRepository');
const { ProductsOverviewViewModel } = require('../viewmodels/ProductsOverviewViewModel');
const { ProductViewModel } = require("../viewmodels/ProductViewModel");

module.exports = {
    createProductsOverviewViewModel,
    createProductViewModel,
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
    viewModel.price = product.price

    return viewModel;
}
