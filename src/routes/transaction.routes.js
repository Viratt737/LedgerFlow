const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const transactionModel = require('../Models/transaction.model');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router();

router.post('/',authMiddleware.authMiddleware, transactionController.createTransaction);

router.post('/system/initial-funds', authMiddleware.authSystemUserMiddleware, transactionController.createTransaction);













module.exports = router;