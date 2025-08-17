import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
const axiosSecure=axios.create({
    baseURL:`https://sports-club-management-system-serve.vercel.app`
})
const useAxiosSecure = () => {
  const {user}=useAuth()
 useEffect(() => {
 if (user) {
    axiosSecure.interceptors.request.use(config=>{
    config.headers.Authorization=`Bearer ${user.accessToken}`
    return config;
  },error=>{
    return Promise.reject(error)
  })
 }
 }, [user])
 
  return axiosSecure
}

export default useAxiosSecure
