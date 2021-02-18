import {
  observable,
  action,
  computed,
  makeAutoObservable,
  makeObservable
} from 'mobx'
import { fetchGoodList} from '@/utils/api'

export default class GoodsStore{
  constructor(){
    makeObservable(this,{
      newGoodList: observable,
      getnewGoodList:action,
      changeList:action
    })
  }

  newGoodList=[]

  getnewGoodList(payload){
    fetchGoodList(payload).then((res)=>{
      console.log('res: ', res);
      this.changeList(res)
    })
  }
  changeList(res){
    this.newGoodList=res
  }
}