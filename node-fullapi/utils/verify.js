function verifyField(key, res) {
  if(!key) {
    res.json({err: 1, msg: `${key}是必填参数`})
    return false
  }else{
    return true
  }
}

module.exports = {
  verifyField
}
