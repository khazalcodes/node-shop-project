const fs = require('fs');
const {db} = require('../../utils/database');


module.exports = {
	deleteProduct,
	fetchAll,
	findById,
	addProduct,
	editProduct,
}

function addProduct (product) {
	readData(products => {
		products.push(product);

		fs.writeFile(db, JSON.stringify(products), (err) => {
			console.log(err);
		})
	});
}

function deleteProduct(id) {
	readData(products => {
		const newProducts = products.filter(p => p.id !== id)

		fs.writeFile(db, JSON.stringify(newProducts), (err) => {
			console.log(err);
		})
	})
}

function editProduct (viewModel) {
	readData(products => {
		// Implement error/sad path
		const product = products.find(p => p.id === viewModel.id);

		product.title = viewModel.title;
		product.imageUrl = viewModel.imageUrl;
		product.description = viewModel.description;
		product.price = viewModel.price;

		fs.writeFile(db, JSON.stringify(products), (err) => {
			console.log(err);
		})
	});
}

function fetchAll() {
	return db.execute('SELECT * FROM products')
		.then(([rows, _]) => rows)
		.catch(err => console.log(err))
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


