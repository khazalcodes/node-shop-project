const express = require('express');

const adminController = require('../controllers/adminController');

const router = express.Router();

module.exports = router;

router.get('/add-product', adminController.viewAddProductForm);

router.post('/add-product', adminController.addProduct);
