const PubSub = require('pubsub-js');
const {removeProduct} = require("../data/repositories/cartRepository");

const UPDATE_PRODUCT = Symbol('updateProduct');
const DELETE_PRODUCT = Symbol('deleteProduct');

module.exports = {
    bindSubscribers,
    publishDeletedProduct,
    publishUpdatedProduct,
}

const eventSubscriberList = {
    [DELETE_PRODUCT]: [removeProduct],
    [UPDATE_PRODUCT]: [removeProduct],
}

function bindSubscribers() {
    const eventSymbols = Object.getOwnPropertySymbols(eventSubscriberList)
    console.log(eventSymbols)

    eventSymbols.map(eventSymbol => {
        eventSubscriberList[eventSymbol]
            .map(subscriber => PubSub.subscribe(eventSymbol, subscriber));
    })
}

function publishDeletedProduct(id) {
    PubSub.publish(DELETE_PRODUCT, id);
}

function publishUpdatedProduct(updatedProduct) {
    PubSub.publish(UPDATE_PRODUCT, updatedProduct);
}