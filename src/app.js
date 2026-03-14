const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../src/routes/auth.route');
const accountRouter = require('../src/routes/account.routes');
const transactionRoutes = require('../src/routes/transaction.routes');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/accounts',accountRouter);
app.use('/api/transactions',transactionRoutes);

module.exports = app