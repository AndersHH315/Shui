const mongoose = require('mongoose');

const streamSchema = mongoose.Schema({
    description: String,
    title: { type: String, unique: true }
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;