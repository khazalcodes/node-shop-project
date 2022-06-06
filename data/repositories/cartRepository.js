const fs = require('fs');
const path = require('path');
const {rootDirectory} = require("../../utils/root-directory");

const cartFile = path.join(rootDirectory, 'data', 'cart.json')

module.exports = {
    addProduct,
    removeProduct,
    fetchCart,
}

function fetchCart(callback) {
    readData(callback);
}

function addProduct(productEntry) {
    readData(cart => {
        const productId = productEntry.productId;

        if (productId in cart.products) {
            cart.products[productId].quantity += 1;
        } else {
            cart.products[productId] = {
                title: productEntry.title,
                price: productEntry.price,
                quantity: 1
            }
        }

        cart.totalPrice += productEntry.price;
        fs.writeFile(cartFile, JSON.stringify(cart), err => console.log(err))
    });
}

function removeProduct(id) {
    readData(cart => {
        let product = cart.products[id];

        if (product === undefined) {
            return;
        }

        cart.totalPrice -= product.price * product.quantity;

        delete cart.products[id];
        console.log(cart);
        fs.writeFile(cartFile, JSON.stringify(cart), err => console.log(err))
    })
}


function readData(callback) {

    fs.readFile(cartFile, (readError, fileContent) => {
        let cart = { products: {}, totalPrice: 0 };

        if (readError) {
            console.log(readError);
            return callback(cart);
        }

        try {
            cart = JSON.parse(fileContent);
        } catch (e) {
            console.log(e);
        }

        return callback(cart);
    })
}
