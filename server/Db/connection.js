const mongoose = require('mongoose');

const url = 'mongodb+srv://Anders:######@myfirstcluster.pmnkh.mongodb.net/shuidb?retryWrites=true&w=majority';

async function dbConnect() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = dbConnect;