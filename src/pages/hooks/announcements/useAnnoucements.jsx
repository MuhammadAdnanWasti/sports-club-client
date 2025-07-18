import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAnnoucements = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/announcements');
      return data;
    },
     staleTime: 60_000,
  });
}

export default useAnnoucements
