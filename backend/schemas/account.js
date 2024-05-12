const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;