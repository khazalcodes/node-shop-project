const productsRepository = require('../data/repositories/productsRepository');
const productsOverviewViewModel = require('../viewmodels/productsOverviewViewModel');
module.exports = {

    createProductsOverviewViewModel
}

function createProductsOverviewViewModel(docTitle, path, callback) {
    productsRepository.fetchAll((products) => {
        const viewModel = new productsOverviewViewModel();

        viewModel.docTitle = docTitle;
        viewModel.path = path;
        viewModel.products = products;
        viewModel.hasProducts = products.length > 0;
        console.log(viewModel.hasProducts)

        return callback(viewModel);
    })
}