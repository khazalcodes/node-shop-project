import {Cart} from "../models/Cart";
import {Collection, Db} from "mongodb";
import {Product} from "../models/Product";

const mongodb = require('mongodb')
const to = require('await-to-js').default;

module.exports = {
    fetchCart,
    addProductToCart,
    removeProductFromCart,
    setDb,
}

let db: Db;
let usersCollection: Collection;

function setDb(mongodbInstance: Db) {
    db = mongodbInstance;
    usersCollection = db.collection('users');
}

async function addProductToCart(userId: string, product: Product) {
    const cartLineHandle = `cart.cartLines.${product.id}`;
    const productDetails = `${cartLineHandle}.product`;

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

    if (err) console.log(err);

    return result
}

async function removeProductFromCart(userId: string, productId: string): Promise<Cart> {
    let err, cart;
    const query = { _id: new mongodb.ObjectId(userId) };
    const cartLineHandle = `cart.cartLines.${productId}`;

    [err, cart] =  await to(usersCollection.updateOne(
        query,
        { $unset: { [`${cartLineHandle}`]: 1 }, }
    ));

    if (err) throw err;

    return cart;
}


async function fetchCart(userId: string): Promise<Cart> {
    console.log(userId)
    const query = { _id: new mongodb.ObjectId(userId) };
    const options = { projection: { cart: 1, _id: 0 } }

    let err, document;
    [err, document] = await to(usersCollection.findOne(query, options));

    if (err) throw err;

    return document.cart;
}