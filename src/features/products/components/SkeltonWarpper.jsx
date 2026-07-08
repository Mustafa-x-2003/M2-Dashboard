import React from 'react'
import Skeleton from 'react-loading-skeleton'
export default function SkeltonWarpper({isloading  , style,width , count, children}) {
  return isloading ?  <Skeleton width={width} className={`skeltonDesign ${style}`}  count={count}/> :  children

}
