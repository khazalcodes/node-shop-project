const cartRepository = require('../../data/repositories/cartRepository');

module.exports = {
    handleDeleteProductEvent
}

function handleDeleteProductEvent(event, id) {
    cartRepository.removeProduct(id);
}