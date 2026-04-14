# LedgerFlow

> A simple yet powerful **Bank Transaction Tracking System** built with Node.js and MongoDB. Manage user accounts, perform deposits & withdrawals, and maintain a full transaction history — all with real-time balance updates.

---
# Live 

https://ledgerflow-kozh.onrender.com/

##  Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Scripts](#scripts)
- [License](#license)

---

## About the Project

**LedgerFlow** is a backend REST API system for tracking bank transactions. It allows users to:

- Register and authenticate securely
- Deposit and withdraw funds
- View their complete transaction history
- Maintain accurate real-time account balances

This project is ideal for learning how to build financial/banking REST APIs using Node.js, Express, and MongoDB.

---

## Features

-  **User Authentication** — Secure login/register with JWT tokens and bcrypt password hashing
-  **Deposits & Withdrawals** — Record transactions with balance auto-update
-  **Transaction History** — Full ledger of all past operations
-  **Real-time Balance Management** — Balances are updated on every transaction
-  **Email Notifications** — Nodemailer integration for sending account alerts
-  **Secure Cookies** — Cookie-parser for managing session tokens
-  **Environment Config** — dotenv for clean configuration management

---

## Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Runtime     | Node.js                        |
| Framework   | Express.js v5                  |
| Database    | MongoDB (via Mongoose)         |
| Auth        | JSON Web Tokens (jsonwebtoken) |
| Passwords   | bcrypt                         |
| Email       | Nodemailer                     |
| Dev Tool    | Nodemon                        |
| Config      | dotenv                         |

---

## Project Structure

```
LedgerFlow/
├── src/                   # Core application source files
│   ├── models/            # Mongoose data models (User, Transaction, etc.)
│   ├── routes/            # Express route definitions
│   ├── controllers/       # Business logic handlers
│   └── middleware/        # Auth middleware, error handlers, etc.
├── server.js              # App entry point — starts the Express server
├── package.json           # Project metadata and dependencies
├── .gitignore             # Files excluded from version control
└── .env                   # Environment variables (not committed — create locally)
```

> **Note:** The `src/` directory contains the core logic. `server.js` is the entry point that initializes and runs the server.

---

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) — local installation or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud cluster

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Viratt737/LedgerFlow.git
cd LedgerFlow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) below).

### 4. Start the Server

For development (with auto-reload on file changes):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start and connect to MongoDB. By default it runs on `http://localhost:3000` (or the port specified in your `.env`).

---

## Environment Variables

Create a `.env` file in the project root and fill in the following values:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/ledgerflow
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ledgerflow

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

>  **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

---

## API Overview

Below is a high-level overview of the expected API endpoints. Refer to the source files in `src/routes/` for full details.

### Authentication

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/register`  | Register a new user      |
| POST   | `/api/auth/login`     | Login and receive JWT    |
| POST   | `/api/auth/logout`    | Logout and clear cookie  |

### Accounts & Transactions

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/account/balance`      | Get current account balance          |
| POST   | `/api/transactions/deposit` | Deposit funds into account           |
| POST   | `/api/transactions/withdraw`| Withdraw funds from account          |
| GET    | `/api/transactions/history` | View all past transactions           |

>  Most endpoints require a valid JWT in the `Authorization` header or as a cookie.

---

## Scripts

| Command       | Description                                  |
|---------------|----------------------------------------------|
| `npm start`   | Start the server with `node server.js`       |
| `npm run dev` | Start in dev mode with `nodemon` (auto-reload)|

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.

---

## Author

Made with by [Viratt737](https://github.com/Viratt737)

> Feel free to fork, star ⭐, or contribute to this project!