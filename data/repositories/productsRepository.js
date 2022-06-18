const fs = require('fs');
const {db} = require('../../utils/database');
const {PrismaClient} = require('@prisma/client')

const prismaClient = new PrismaClient()

module.exports = {
	deleteProduct,
	fetchAll,
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

function editProduct (product) {
	return prismaClient.product.update({
		where: {
			id: product.id
		},
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

function fetchAll() {
	return prismaClient.product.findMany()
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


