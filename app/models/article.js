const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const article = new Schema({
    title: String,
    description: {
        type: String,
        required: true       //   حتما وارد شود
    },
    file  : String,
    text: String,
    author: String,
    Link: String,
    createDate: Date
});

module.exports = mongoose.model('article', article);