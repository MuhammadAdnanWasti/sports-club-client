import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMembers  = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-members');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export default useMembers 
