const {getDb} = require('../mongodb-database');
const to = require('await-to-js').default;

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllUserProducts,
	fetchProduct,
}

async function addProduct (product) {
	const db = getDb();

	let err, result;
	[err, result] = await to(db.collection('products').insertOne(product));

	if (err) console.log(err);

	console.log(result)
	return result
}

async function deleteProduct(id) {
	throw 'NOT IMPLEMENTED';
}

async function editProduct (editedProduct) {
	throw 'NOT IMPLEMENTED';
}

async function fetchAllUserProducts(userId) {
	throw 'NOT IMPLEMENTED';
}


async function fetchProduct(productId) {
	throw 'NOT IMPLEMENTED';
}
