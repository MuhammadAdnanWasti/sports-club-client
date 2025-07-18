import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCoupons = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/coupons');
      return data; // array
    },
    staleTime: 60_000,
  });
};

export default useCoupons
