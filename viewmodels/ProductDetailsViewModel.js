const { ProductViewModel } = require("./ProductViewModel");

exports.ProductDetailsViewModel = class {
    docTitle = '';
    path = '';
    submitButtonText = '';

    product = new ProductViewModel();
}
