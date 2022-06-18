const fs = require('fs');
const {db} = require('../../utils/database');
const {PrismaClient} = require('@prisma/client')

const prismaClient = new PrismaClient()

module.exports = {
	deleteProduct,
	fetchAll,
	findById,
	addProduct,
	editProduct,
}

function addProduct (product) {
	return prismaClient.product.create({
		data: {
			title: product.title,
			price: product.price,
			imageUrl: product.imageUrl,
			description: product.description,
			orders: {},
			carts: {},
		}
	})
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

// function fetchAll() {
// 	return db.execute('SELECT * FROM products')
// 		.then(([rows, _]) => rows)
// 		.catch(err => console.log(err))
// }

function fetchAll() {
	return prismaClient.product.findMany()
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


