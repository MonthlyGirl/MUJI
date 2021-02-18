const mongoose = require('mongoose')

module.exports = mongoose.model('ads', new mongoose.Schema({
    name: String,
    img: String,
    create_time: Number
}))