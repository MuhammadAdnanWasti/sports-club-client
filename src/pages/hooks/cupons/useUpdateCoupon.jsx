import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
const useUpdateCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosSecure.patch(`/coupons/${id}`, payload);
      return data;
    },
    onSuccess: () =>{ qc.invalidateQueries({ queryKey: ['coupons'] }),
  
   Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Coupon is updated",
                    showConfirmButton: false,
                    timer: 1500})
  }
  });
};

export default useUpdateCoupon
