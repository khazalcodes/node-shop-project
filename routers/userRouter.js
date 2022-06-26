const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

module.exports = router;

router.get('/orders-overview', userController.ordersOverview);
