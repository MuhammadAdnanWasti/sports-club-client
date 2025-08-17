import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
const axiosSecure=axios.create({
    baseURL:`https://sports-club-management-system-serve.vercel.app`
})
const useAxiosSecure = () => {
  const {user, loading}=useContext(AuthContext)
useEffect(() => {
    if (!loading && user?.accessToken) {
      // Add request interceptor
      const requestInterceptor = axiosSecure.interceptors.request.use(
        (config) => {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          return config;
        }
      );

      // Add response interceptor
     

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
       
      };
    }
  }, [user, loading]);

  return axiosSecure;
}

export default useAxiosSecure
