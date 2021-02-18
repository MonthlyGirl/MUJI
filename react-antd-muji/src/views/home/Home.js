import React from 'react'

import NoticeBar from '@/views/home/components/NoticeBar'
import Carousel from '@/views/home/components/Carousel'
import PartHeader from '@/views/home/components/PartHeader'
import Campaign from '@/views/home/components/Campaign'
import NewGood from '@/views/home/components/NewGood'
import Leaderboard from '@/views/home/components/Leaderboard'

export default props=>{
  return(
    <div>
      {/* 通知栏 */}
      <NoticeBar/>
      {/* 轮播图 */}
      <Carousel/>
      {/* 每一部分的头部 */}
      <PartHeader value={"特集"} path={"campa"}/>
      {/* 特集 */}
      <Campaign/>
      <PartHeader value={"新商品"} path={"/good/list"}/>
      <NewGood/>
      <PartHeader value={"销量排行榜"} path={"/good/list"}/>
      <Leaderboard/>
    </div>
  )
}