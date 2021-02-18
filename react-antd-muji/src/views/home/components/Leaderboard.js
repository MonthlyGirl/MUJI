import React, { useEffect,useState } from 'react'

import GoodCard from '@/views/components/GoodCard'
import { fetchGoodList } from '@/utils/api'

export default props => {
  const [goodList, setGoodList] =useState([])
  useEffect(() => {
    fetchGoodList({rank:2,size:16}).then(res=>{
      console.log('res: ', res);
      setGoodList(res.list)
      console.log('goodList: ', goodList);
    })
    return undefined
  }, [])

  return (
    <div>
      <GoodCard goodList={goodList} />
    </div>
  )
}
