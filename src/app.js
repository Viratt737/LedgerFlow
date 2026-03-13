const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../src/routes/auth.route');
const accountRouter = require('../src/routes/account.routes');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/accounts',accountRouter);

module.exports = app