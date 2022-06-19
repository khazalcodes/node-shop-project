const productsRepository = require('../data/repositories/productsRepository');
const { ProductsOverviewViewModel } = require('../viewmodels/ProductsOverviewViewModel');
const { ProductViewModel } = require("../viewmodels/ProductViewModel");
const Product = require("../models/Product");
const to = require('await-to-js').default;

module.exports = {
    createNewProduct,
    createProductViewModel,
    createProductsOverviewViewModel,
    createUserProductsOverviewViewModel,
}

function createNewProduct(request) {
    const product = new Product();

    product.title =  request.body.title;
    product.imageUrl =  request.body.imageUrl;
    product.description =  request.body.description;
    product.price =  parseFloat(request.body.price);
    product.authorId = request.app.get('user').id;

    return product;
}

function createProductsOverviewViewModel(docTitle, path) {
    return productsRepository.fetchAll()
        .then(products => {
            const viewModel = new ProductsOverviewViewModel();
            viewModel.docTitle = docTitle;
            viewModel.path = path;
            viewModel.products = convertProductsToProductViewModels(products);
            viewModel.hasProducts = products.length > 0;

            return viewModel;
        })
        .catch(err => console.log(err));
}

async function createUserProductsOverviewViewModel(docTitle, path, userId) {
    let err, products;
    [err, products] = await to(productsRepository.fetchAllUserProducts(userId));

    if (err) return err;

    const viewModel = new ProductsOverviewViewModel();

    viewModel.docTitle = docTitle;
    viewModel.path = path;
    viewModel.products = convertProductsToProductViewModels(products);
    viewModel.hasProducts = products.length > 0;

    return viewModel;
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

    viewModel.id = parseInt(product.id);
    viewModel.title = product.title;
    viewModel.imageUrl = product.imageUrl;
    viewModel.description = product.description;
    viewModel.price =  parseFloat(product.price);
    viewModel.authorId = product.authorId;

    return viewModel;
}
