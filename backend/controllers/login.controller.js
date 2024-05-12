// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('./schemas/account');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Đăng ký
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = new Account({ username, password: hashedPassword });
    await account.save();
    res.status(201).send('Account registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Đăng nhập
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(404).send('Account not found');
    }
    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ id: account._id }, 'secret_key');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.account = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid token');
  }
};

// Đăng xuất
app.post('/logout', authenticateToken, (req, res) => {
  res.status(200).send('Logged out successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});