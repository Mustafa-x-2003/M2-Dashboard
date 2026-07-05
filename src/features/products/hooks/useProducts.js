import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "../services/productsApi";
export function useProducts(){
const [loading ,setLoading ] = useState(false)
const [error , setError ] = useState(null)
const [products , setProducts] = useState([])
const fetchProducts = useCallback(async()=>{
    setLoading(true) ; 
    setError(null) ;
    try {
        const {data} = await getAllProducts() ;
        setProducts(Array.isArray(data)? data:(data.products ?? []))
    } catch (err) {
        setError(err)
    }finally{
        setLoading(false) 
    }
},[])
useEffect(()=>{fetchProducts()} , [fetchProducts])
return {products , loading , error , refetch: fetchProducts}
}