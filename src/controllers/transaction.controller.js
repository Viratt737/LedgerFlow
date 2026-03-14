const transactionModel = require('../Models/transaction.model');
const ledgerModel = require('../Models/ledger.model');
const emailService = require('../services/email.service');
const accountModel = require('../Models/account.model');

async function createTransaction(req, res){
    // check valid request is coming or not
    const{fromAccount , toAccount, amount, idempotencyKey} = req.body;
     if(!toAccount || !amount || !idempotencyKey || !fromAccount){
        return res.status(400).json({
            msg:"toAccount, amount, fromAccount and idempotencykey are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })
    
    const toUserAccount = await accountModel.findOne({
        _id : toAccount,
    })

    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({
            msg:"Invaild fromAccount or toAccount"
        })
    }

    // validate idempotency key
    c
}

async function createInitialFundsTransaction(req, res){
    const {toAccount, amount, idempotencyKey} = req.body;
    
    if(!toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            msg:"toAccount, amount and idempotencykey are required"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    });

    if(!toUserAccount){
        return res.status(400).json({
            msg:"Invail toAccount"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        systemUser: true,
        currency : req.user._id
    })

    if(!fromUserAccount){
        return res.status(404).json({
            msg:"System user account not found"
        })
    }
}

const session = await mongoose.startSession()
session.startTransaction();

module.exports = {
    createTransaction
}
