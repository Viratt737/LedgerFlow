require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"LegerFlow" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistratiinEmail(userEmail, name){
    const subject = 'Welcome to LedgerFlow !!';
    const text = `Hello ${name},\n\nThankyou for regitering at Backend Ledger.
    We're excited to have you on board!\n\n Best regards,\nThe LedgerFlow Team`;
    const html = `<p>Hello ${name},</p><p>Thankyou for registering at LedgerFlow. We are exxited to have you on board!</p><p>Best regards,<br>The LedgerFlow
    Team</p>`;
    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount ){
    const subject = 'Transaction SuccessFull';

    const text = `Hello ${name},\n\nYour transaction of ${amount} to account ${toAccount} was successful.\n\n
    Best regards, \n The LedgerFlow Team`;

    const html = `<p>Hello ${name},</p><p>Your Transaction of ${amount} to account ${toAccount} was successful.</p>`
    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount){
    const subject = 'Transaction Failed';

    const text = `Hello ${name},\n\nYour transaction of ${amount} to account ${toAccount} has failed.\n\n
    Please try again or contact support if the problem persists.\n\n
    Best regards, \n The LedgerFlow Team`;

    const html = `<p>Hello ${name},</p>
    <p>Your transaction of ${amount} to account ${toAccount} has <b>failed</b>.</p>
    <p>Please try again or contact support if the problem persists.</p>`;

    await sendEmail(userEmail, subject, text, html);
}




module.exports = {
    sendRegistratiinEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};