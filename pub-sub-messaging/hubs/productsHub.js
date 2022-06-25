const PubSub = require('pubsub-js');
const cartSubscriber = require("../subs/cartSubscriber");

const UPDATE_PRODUCT = Symbol('updateProduct');
const DELETE_PRODUCT = Symbol('deleteProduct');

module.exports = {
    bindSubscribers,
    publishDeleteProductEvent,
    publishUpdatedProduct,
}

const eventSubscriberList = {
    [DELETE_PRODUCT]: [cartSubscriber.handleDeleteProductEvent],
    [UPDATE_PRODUCT]: [cartSubscriber.handleDeleteProductEvent],
}

function bindSubscribers() {
    const eventSymbols = Object.getOwnPropertySymbols(eventSubscriberList)

    eventSymbols.map(eventSymbol => {
        eventSubscriberList[eventSymbol]
            .map(subscriber => PubSub.subscribe(eventSymbol, subscriber));
    })
}

function publishDeleteProductEvent(id) {
    PubSub.publish(DELETE_PRODUCT, id);
}

function publishUpdatedProduct(updatedProduct) {
    PubSub.publish(UPDATE_PRODUCT, updatedProduct);
}