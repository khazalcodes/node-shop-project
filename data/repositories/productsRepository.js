const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;

const prismaClient = new PrismaClient({
	rejectOnNotFound: true
})

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
	let err, deletedProduct;
	[err, deletedProduct] = await to(prismaClient.product.delete({
		where: {
			id: id
		},
	}));

	if (err) {
		console.log(err);
		return undefined;
	}

	return deletedProduct;
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
