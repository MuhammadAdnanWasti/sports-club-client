import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useCreateCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post('/coupons', payload);
      return data;
    },
    onSuccess: () => {qc.invalidateQueries({ queryKey: ['coupons'] }),
  
    Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Coupon is successfully created",
                  showConfirmButton: false,
                  timer: 1500})
  }
  });
};

export default useCreateCoupon
