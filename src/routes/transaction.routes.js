const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const transactionModel = require('../Models/transaction.model');
const router = express.Router();

router.post('/',authMiddleware.authMiddleware, transactionModel)












module.exports = router;