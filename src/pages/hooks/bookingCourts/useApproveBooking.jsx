import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useApproveBooking = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/bookings/${id}/approve`, { status: 'approved' });
      return data;
    },
    onSuccess: () =>{ qc.invalidateQueries(['pending-bookings']),
         Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Booking approved",
                      showConfirmButton: false,
                      timer: 1500})
    }
  });
};

export default useApproveBooking
