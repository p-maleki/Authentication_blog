const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const Comment = new Schema({
    comment: String,
    article: String,
    createDate: Date
});

module.exports = mongoose.model('Comment', Comment);