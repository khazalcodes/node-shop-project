const mongodb = require('mongodb')
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
	productsCollection.updateOne(
		{_id: new mongodb.ObjectId(editedProduct.id)},
		{
			$set: {
				'title': editedProduct.title,
				'imageUrl': editedProduct.imageUrl,
				'price': editedProduct.price,
				'description': editedProduct.description,
			}
		})
}

async function fetchAllUserProducts(userId) {
	const products = await productsCollection.find().toArray();
	products.forEach(p => p.id = p._id)
	return products
}

async function fetchProduct(productId) {
	throw 'NOT IMPLEMENTED';
}
