import { observable, action, computed } from 'mobx'
import goods  from './modules/goods'
import addr from './modules/addr'

class Store {
  constructor() {
    // this.music = new Music   //将每个store实例化
    this.goods = new goods
    this.addr = new addr
  }
}

export default new Store()   //再将store实例化化抛出