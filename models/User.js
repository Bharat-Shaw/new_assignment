const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }
})

const UserModel = mongoose.model('model', userSchema);

module.exports = { UserModel }
