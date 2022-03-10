const mongoose = require('mongoose');

const addStreamSchema = mongoose.Schema({
    streamID: { type: mongoose.Schema.Types.ObjectId, ref: 'Streams'},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const AddStream = mongoose.model('AddStream', addStreamSchema);

module.exports = AddStream;