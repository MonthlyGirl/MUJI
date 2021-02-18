import {
  observable,
  action,
  computed,
  makeObservable
} from 'mobx'
import { fetchAddrList } from '@/utils/api'

export default class AddrStore{
  constructor(){
    makeObservable(this,{
      AddrList:observable,
      getAddrList:action,
      changeList:action
    })
  }
  AddrList = []

  getAddrList(payload){
    fetchAddrList(payload).then(res=>{
      this.AddrList = res
    })
  }

  changeList(res){
    this.AddrList=res
  }
}