var mongoose = require('mongoose')

module.exports = mongoose.model('goodDetails', new mongoose.Schema({
  good_id:String,
  name: String,
  quality:String,
  price: Number,
  detail_01: String,
  detail_02: String,

}))