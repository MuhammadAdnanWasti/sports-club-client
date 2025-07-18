import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const useCourts = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/courts');
      return data;
    },
    staleTime: 60 * 1000,
  });
};
export default useCourts
