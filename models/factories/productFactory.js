const Product = require("../Product");

module.exports = {
	createProduct,
}

function createProduct(request) {
	const title =  request.body.title;
	const imageUrl =  request.body.imageUrl;
	const description =  request.body.description;
	const price =  request.body.price;
	const id =  Math.random().toString();

	return new Product(id, title, imageUrl, description, price);
}