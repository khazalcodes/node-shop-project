const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

module.exports = router;

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product', adminController.getEditProductForm);
router.post('/edit-product', adminController.postEditProductForm);

router.get('/products-overview', adminController.productsOverview);
