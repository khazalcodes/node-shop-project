const mongodb = require('mongodb')
const to = require('await-to-js').default;

module.exports = {
    fetchCart,
    addProductToCart,
    removeProductFromCart,
    setDb,
}

let db = undefined;
let cart = undefined;
let usersCollection = undefined;

function setDb(mongodbInstance) {
    db = mongodbInstance;
    usersCollection = db.collection('users');
}

async function addProductToCart(userId, productId) {
    let err, result;
    const query = { _id: new mongodb.ObjectId(userId) };

    [err, result] = await to( usersCollection.updateOne(
        query,
        { $inc: { [`cart.items.${productId}`]: 1 } }
    ));

    console.log(result);

    if (err) console.log(err);

    return result
}

async function removeProductFromCart(userId, productId) {
    let err, cart;
    [err, cart] =  await to();

    if (err) {
        console.log(err);
        return undefined
    }

    return cart;
}

async function fetchCart(userId) {
    const query = { _id: new mongodb.ObjectId(userId) };
    const options = { projection: { cart: 1, _id: 0 } }

    let err, document;
    [err, document] = await to(usersCollection.findOne(query, options));

    if (err) {
        console.log(err);
        return undefined;
    }

    return document.cart;
}