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
	return prismaClient.product.delete({
		where: {
			id: id
		}
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
