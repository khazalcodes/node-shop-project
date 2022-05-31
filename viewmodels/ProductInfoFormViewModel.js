const { ProductViewModel } = require("./ProductViewModel");

exports.ProductInfoFormViewModel = class {
    docTitle = '';
    path = '';
    submitButtonText = '';
    postPath = ''

    product = new ProductViewModel();
}