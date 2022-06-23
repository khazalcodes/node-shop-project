const {PrismaClient} = require('@prisma/client')

const prismaClient = new PrismaClient()

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAll,
	fetchAllUserProducts,
}

async function addProduct (product) {
	return prismaClient.product.create({
		data: {
			title: product.title,
			price: product.price,
			imageUrl: product.imageUrl,
			description: product.description,
			authorId: product.authorId,
			orders: {},
			cartLines: {},
		}
	})
}

async function deleteProduct(id) {
	return prismaClient.product.delete({
		where: {
			id: id
		}
	})
}

async function editProduct (product) {
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

async function fetchAll() {
	return prismaClient.product.findMany()
}

async function fetchAllUserProducts(userId) {
	return prismaClient.product.findMany({
		where: {
			authorId: userId
		}
	})
}
