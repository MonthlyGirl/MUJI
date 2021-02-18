var mongoose = require('mongoose')

module.exports = mongoose.model('goods', new mongoose.Schema({
  name: String,
  good_id: String,
  img: String,
  price: Number,
  cate: String,
  hot: Boolean,
  
  rank: Number,
  status: Number,
  quality:String,
  detail_01:String,
  detail_02: String,
}))
