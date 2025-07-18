import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
const useCreateCourt = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosSecure.post('/courts', payload);
      return data;
    },
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['courts'] }),
    Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Court is successfully created",
              showConfirmButton: false,
              timer: 1500})
  
  }
  });
};
export default useCreateCourt