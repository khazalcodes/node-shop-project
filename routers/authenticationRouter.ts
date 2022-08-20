const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get('/login', loginController.index);
router.post('/login', loginController.login);

module.exports = router;
