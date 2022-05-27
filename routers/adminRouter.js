const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

module.exports = router;

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product/:productId', adminController.postEditProduct);

router.get('/products-overview', adminController.productsOverview);
