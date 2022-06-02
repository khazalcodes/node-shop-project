const fs = require('fs');
const path = require('path');
const rootDirectory = require('../../utils/root-directory');

const cartFile = path.join(rootDirectory, 'data', 'cart.json')

module.exports = {
    addProduct,
    removeProduct,
}

// why does using .productId not work properly?
function addProduct(productId, title, price) {
    readData(cart => {
        price = parseInt(price);

        if (productId in cart.products) {
            cart.products[productId].quantity += 1;
        } else {
            cart.products[productId] = {
                title: title,
                price: price,
                quantity: 1
            }
        }

        cart.totalPrice += price;
        console.log(cart);
        fs.writeFile(cartFile, JSON.stringify(cart), err => console.log(err))
    });
}

function removeProduct(productId) {
    readData(cart => {
        let product = cart.products[productId];

        if (product === undefined) {
            return;
        }

        cart.totalPrice -= product.price * product.quantity;

        delete cart.products.id;
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
