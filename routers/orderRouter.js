const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

module.exports = router

router.get('/product-details', shopController.fetchProductDetails)
