import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useRejectBooking = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/bookings/${id}/reject`, { status: 'rejected' });
      return data;
    },
    onSuccess: () => {qc.invalidateQueries(['pending-bookings']),
        Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Booking rejected",
                              showConfirmButton: false,
                              timer: 1500})
    }
  });
};

export default useRejectBooking
