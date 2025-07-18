import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';
import Swal from 'sweetalert2';
const useCreateBooking = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post('/bookings', payload);
      return data;
    },
    onSuccess: () => {
      // invalidate bookings if you have a user bookings query
      qc.invalidateQueries({ queryKey: ['my-bookings'] }),
       Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Court booking request send",
                    showConfirmButton: false,
                    timer: 1500})
    },
  });
};

export default useCreateBooking
