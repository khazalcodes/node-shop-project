const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

module.exports = router;

router.get("/", shopController.index);

router.get("/cart", shopController.cart);
router.post("/cart/complete-order", shopController.completeOrder);
router.post("/cart/remove-product", shopController.removeProductFromCart);

router.get("/products", shopController.products);

router.get("/product-details/", shopController.productDetails);

router.post("/add-to-cart", shopController.addProductToCart);


