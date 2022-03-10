const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    admin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;