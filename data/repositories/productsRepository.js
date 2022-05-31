const fs = require('fs');
const path = require('path');
const rootDirectory = require('../../utils/root-directory');

const db = path.join(rootDirectory, 'data', 'products.json');

module.exports = {
	fetchAll,
	findById,
	saveProduct,
	updateProduct,
}

function fetchAll(callback) {
	readData(callback);
}

function findById(id, callback) {
	readData(products => {
		const product = products.find(p => p.id === id);
		callback(product);
	})
}

function readData(callback) {
	let products = []

	fs.readFile(db, (readError, fileContent) => {
		if (readError) {
			console.log(readError);
			return callback(products);
		}
		
		try {				
			products = JSON.parse(fileContent);
		} catch(parseError) {
			console.log(parseError);
		}

		return callback(products);
	});
}

function saveProduct (product) {
	readData(products => {
		products.push(product);
	
		fs.writeFile(db, JSON.stringify(products), (err) => {
			console.log(err);
		})
	});
}

function updateProduct (product) {
	readData(products => {
		// Implement error/sad path
		products[product.id] = product;

		fs.writeFile(db, JSON.stringify(products), (err) => {
			console.log(err);
		})
	});
}
