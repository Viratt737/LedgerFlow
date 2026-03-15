const transactionModel = require('../Models/transaction.model');
const ledgerModel = require('../Models/ledger.model');
const emailService = require('../services/email.service');
const accountModel = require('../Models/account.model');
const mongoose = require('mongoose');


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
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if(isTransactionAlreadyExists){
        if(isTransactionAlreadyExists.status === "COMPLETED"){
            return res.status(200).json({
                msg:"TransactionAlreadyExists"
            })
        }

       if(isTransactionAlreadyExists.status === "PENDING"){
        return res.status(202).json({
            msg:"Transaction still in processing"
        })
       }

        if(isTransactionAlreadyExists.status === "FAILED"){
        return res.status(500).json({
            msg:"Transaction processing failed !!"
        })
       }

        if(isTransactionAlreadyExists.status === "REVERSED"){
        return res.status(500).json({
            msg:"Transaction reversed please retry !!"
        })
       }
    }

    // check account status
    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
        return res.status(404).json({
            msg : "BOTH fromAccount and toAccount must be ACTIVE to process transaction!!"
        })
    }
    //  check balance is enough to send to other account

    const balance = await fromUserAccount.getBalance();

    if(balance < amount){
        return res.status(400).json({
            msg: `Insufficient balance. Current balance is ${balance}. Requested increase your current amount ${amount}`
        })
    }

    // 5 create transation(pending)

    const session = await mongoose.startSession()
    session.startTransaction();

    const transaction = await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    }, {session})

   const debitLedgerEntry = await ledgerModel.create({
      account : fromAccount,
      amount : amount,
      transaction : transaction._id,
      type : "DEBIT"
   },{session})

   const creditLedgerEntry = await ledgerModel.create({
    account : toAccount,
    amount : amount,
    transaction : tranaction._id,
    type: "DEBIT"
   }, {session})
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

module.exports = {
    createTransaction
}
