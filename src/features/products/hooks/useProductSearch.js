import {useCallback, useEffect, useState } from "react";
import { searchProducts , getAllProducts } from "../services/productsApi";
export function useProductSearch(){
 const [query , setQuery] = useState('')
 const [loading ,setLoading ] = useState(false)
 const [error , setError ] = useState(null)
 const [result , setResult] = useState([])
 const [refreshkey , setRefreshKey] = useState(0)
 const search = useCallback(async (q)=>{
    setLoading(true) ; 
    setError(null) ;
    try {
        if(!q.trim()){
            const {data} = await getAllProducts()
            setResult(Array.isArray(data)?data:(data.products ?? []))
        }else{
            const {data} = await searchProducts(q)
            setResult(Array.isArray(data)?data:(data.products ?? []))
        }       
    }catch(err){
        setError(err)
    }finally{
        setLoading(false) ; 
    }
 },[])
 useEffect(()=>{
    const delay = query.trim()?400 : 0 ;
    const timer = setTimeout(()=>search(query) ,delay)
    return ()=>clearTimeout(timer)
 },[query , refreshkey , search])
  const refresh = ()=>setRefreshKey(prev=>prev+1)
  return {result , loading , error , refresh , query ,setQuery}
}