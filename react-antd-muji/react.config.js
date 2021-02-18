const path = require('path')
module.exports={
  devServer:{
    port:8809
  },
  alias:{
    '@':path.resolve(__dirname,'./src')
  }
}