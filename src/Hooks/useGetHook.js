import React,{ useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'

const useGetHook=(url,date)=>{
    const cookies = new Cookies();
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
useEffect(()=>{
    setLoading(true)
    const token= cookies.get('token')
    const headers={"Authorization":"Bearer "+token}
axios.get(url,{headers}).then((response)=>{
setData(response.data)
}).catch((err)=>{
    setError(err)
}).finally(()=>{
    setLoading(false)
})

},[date])
return {data,loading,error}
}
export default useGetHook