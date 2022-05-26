const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

module.exports = router;

router.get("/", shopController.index);

router.get("/cart", shopController.cart);

router.get("/orders", shopController.orders);

router.get("/products", shopController.products);

router.get("/product-details/:id", shopController.productDetails)

router.post("/add-to-cart", shopController.addProductToCart)
