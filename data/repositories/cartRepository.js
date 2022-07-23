const mongodb = require('mongodb')
const to = require('await-to-js').default;

module.exports = {
    fetchCart,
    addProductToCart,
    removeProductFromCart,
    setDb,
}

let db = undefined;
let usersCollection = undefined;

function setDb(mongodbInstance) {
    db = mongodbInstance;
    usersCollection = db.collection('users');
}

async function addProductToCart(userId, product) {
    const cartLineHandle = `cart.items.${product.id}`;
    const productDetails = `${cartLineHandle}.details`;

    let err, result;
    const query = { _id: new mongodb.ObjectId(userId) };

    [err, result] = await to(usersCollection.updateOne(
        query,
        {
            // Currently setting every single time, need to find a way to do only once
            $set: { [productDetails]: product },
            $inc: { [`${cartLineHandle}.quantity`]: 1 },
        }
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
    console.log(userId)
    const query = { _id: new mongodb.ObjectId(userId) };
    const options = { projection: { cart: 1, _id: 0 } }

    let err, document;
    [err, document] = await to(usersCollection.findOne(query, options));

    if (err) {
        console.log(err);
        return undefined;
    }

    return document;
}