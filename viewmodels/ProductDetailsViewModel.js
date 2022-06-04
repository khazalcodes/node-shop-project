const { ProductViewModel } = require("./ProductViewModel");

exports.ProductDetailsViewModel = class {
    docTitle = '';
    path = '';

    product = new ProductViewModel();
}
