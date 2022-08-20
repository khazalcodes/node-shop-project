const {ProductsOverviewViewModel} = require('../viewmodels/ProductsOverviewViewModel');
const {ProductViewModel} = require("../viewmodels/ProductViewModel");
const {ProductInfoFormViewModel} = require('../viewmodels/ProductInfoFormViewModel');
const {ProductDetailsViewModel} = require('../viewmodels/ProductDetailsViewModel');

module.exports = {
    createNewProductViewModel,
    createProductViewModel,
    createProductDetailsViewModel,
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

function createUserProductsOverviewViewModel(docTitle, path, products) {
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

// figure out how to do both parseInt and send back object depending on db for edit post
function createProductViewModel(rawProductInfo) {
    const viewModel = new ProductViewModel()

    viewModel.id = rawProductInfo.id;
    viewModel.title = rawProductInfo.title;
    viewModel.imageUrl = rawProductInfo.imageUrl;
    viewModel.description = rawProductInfo.description;
    viewModel.price =  parseFloat(rawProductInfo.price);
    viewModel.authorId = rawProductInfo.authorId;

    return viewModel;
}

function createProductDetailsViewModel(rawProductInfo) {
    const productViewModel = createProductViewModel(rawProductInfo);
    const viewModel = new ProductDetailsViewModel()

    viewModel.product = productViewModel;
    viewModel.docTitle = `${viewModel.product.title} | Overview`;
    viewModel.path = '/shop/product-details';

    return viewModel
}

function _convertProductsToProductViewModels(products) {
    const productViewModels = [];

    products.forEach(p => {
        const viewModel = createProductViewModel(p);
        productViewModels.push(viewModel)
    })

    return productViewModels;
}
