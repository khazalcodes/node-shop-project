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
	let err, result;
	[err, result] = await to(productsCollection.deleteOne({_id: new mongodb.ObjectId(id)}));

	if (err) console.log(err);

	console.log(result)
	return result
}

async function editProduct (editedProduct) {
	let err, result;
	[err, result] = await to(
		productsCollection.updateOne(
			{ _id: new mongodb.ObjectId(editedProduct.id) },
			{
				$set: {
					'title': editedProduct.title,
					'imageUrl': editedProduct.imageUrl,
					'price': editedProduct.price,
					'description': editedProduct.description,
				}
			}));

	if (err) console.log(err);

	return result;
}

async function fetchAllUserProducts(userId) {
	const products = await productsCollection.find().toArray();
	products.forEach(p => p.id = p._id)

	return products
}

async function fetchProduct(productId) {
	let err, product;
	[err, product] = await to(productsCollection.find({ _id: new mongodb.ObjectId(productId) }))

	if (err) console.log(err);

	return product
}
