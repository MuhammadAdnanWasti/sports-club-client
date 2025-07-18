import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePendingBookings = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['pending-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings?status=pending');
      return res.data; // array of enriched bookings
    },
    staleTime: 30_000,
  });
};

export default usePendingBookings
