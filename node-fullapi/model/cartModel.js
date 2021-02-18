var mongoose = require('mongoose')

module.exports = mongoose.model('carts', new mongoose.Schema({
  user_id: String,  // 用户_id
  good_id: String,  // 商品_id
  create_time: Number,  // 购买时间
  num: Number,        // 下单数量
  status: Number     // 1-正常， 0-已被删除
}))
