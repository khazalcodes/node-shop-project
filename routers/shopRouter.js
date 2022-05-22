const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

module.exports = router;

router.get("/", shopController.index);

router.get("/cart", shopController.cart);

router.get("/products", shopController.products);
