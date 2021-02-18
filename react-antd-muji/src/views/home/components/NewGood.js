import React, { useEffect }from 'react'
import { inject, observer } from 'mobx-react'

import GoodCard from '@/views/components/GoodCard'

export default inject('store')(observer(props=>{
  const { goods } = props.store
  const goodList=goods.newGoodList.list
  useEffect(() => {
    // console.log('rank: ', rank);
    goods.getnewGoodList({ rank:1,size:8 })
  }, [])

  return (
    <div>
      <GoodCard goodList={goodList}/>
    </div>
  )
}))
