const {PrismaClient} = require('@prisma/client')
const to = require('await-to-js').default;

const prismaClient = new PrismaClient({
	rejectOnNotFound: true
})

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllUserProducts,
	fetchProduct,
}

async function addProduct (product) {
	return prismaClient.product.create({
		data: {
			title: product.title,
			price: product.price,
			imageUrl: product.imageUrl,
			description: product.description,
			authorId: product.authorId,
			orderLines: {},
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

async function editProduct (editedProduct) {
	let err, product;
	[err, product] = await to(prismaClient.product.update({
		where: {
			id: editedProduct.id
		},
		data: {
			title: editedProduct.title,
			price: editedProduct.price,
			imageUrl: editedProduct.imageUrl,
			description: editedProduct.description,
		}
	}));

	if (err) {
		console.log(err);
		product = undefined;
	}

	return product
}

async function fetchAllUserProducts(userId) {
	return prismaClient.product.findMany({
		where: {
			authorId: userId
		}
	})
}


async function fetchProduct(productId) {
	let err, product;
	[err, product] = await to(prismaClient.product.findUnique({
		where: {
			id: productId
		}
	}));

	if (err) {
		console.log(err);
		product = null;
	}

	return product;
}
