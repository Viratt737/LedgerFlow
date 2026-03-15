const express = require('express');
const  {authMiddleware, authSystemUserMiddleware} = require('../middleware/auth.middleware');
const transactionModel = require('../Models/transaction.model');
const transactionController = require('../controllers/transaction.controller');
const router = express.Router();

router.post('/',authMiddleware, transactionController.createTransaction);

router.post('/system/initial-funds',authSystemUserMiddleware, transactionController.createTransaction);













module.exports = router;