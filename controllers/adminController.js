const productsRepository = require('../data/repositories/productsRepository');
const Product = require('../models/Product');
const { products } = require('./shopController');

module.exports = {
	getAddProduct,
	postAddProduct,
	productsOverview
}

function getAddProduct(req, res, next) {
	res.render('admin/add-product', {
		docTitle: 'Add a product', 
		path: '/admin/add-product'
	});
}

function postAddProduct(req, res, next) {
	const title =  req.body.title;
	const imageUrl =  req.body.imageUrl;
	const description =  req.body.description;
	const price =  req.body.price;
	const id =  Math.random().toString();
	
	productsRepository.saveProduct(new Product(id, title, imageUrl, description, price)); 

	res.redirect('/');
}	

function productsOverview(req, res, next) {
	productsRepository.fetchAll((products) => {
		res.render('admin/products-overview', {
			docTitle: "Admin | Products overview",
			hasProducts: products.length > 0,
			path: "/admin/products-overview",
			products: products
		});
	})
}