import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
const useDeleteCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/coupons/${id}`);
      return data;
    },
    onSuccess: () =>{ qc.invalidateQueries({ queryKey: ['coupons'] }),
  
   Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Coupon is successfully deleted",
                    showConfirmButton: false,
                    timer: 1500})
  }
  });
};

export default useDeleteCoupon
