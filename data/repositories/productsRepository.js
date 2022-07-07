const {getDb} = require('../mongodb-database');
const to = require('await-to-js').default;

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllUserProducts,
	fetchProduct,
	setDb
}

let db;
let productsCollection;

function setDb(mongoDbInstance) {
	db = mongoDbInstance;
	productsCollection = db.collection('products');
}

async function addProduct (product) {
	let err, result;
	[err, result] = await to(productsCollection.insertOne(product));

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
	return await productsCollection.find().toArray();
}

async function fetchProduct(productId) {
	throw 'NOT IMPLEMENTED';
}
