import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRegularUsers = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['regular-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-users');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export default useRegularUsers
