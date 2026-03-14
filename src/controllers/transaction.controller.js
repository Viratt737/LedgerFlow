const transactionModel = require('../Models/transaction.model');
const ledgerModel = require('../Models/ledger.model');
const emailService = require('../services/email.service');

async function createTransaction(req, res){
    const{fromAccont , toAccount, amount, idempotencyKey} = req.body;
    
}

