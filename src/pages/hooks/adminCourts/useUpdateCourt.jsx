import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useUpdateCourt = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosSecure.patch(`/courts/${id}`, payload);
      return data;
    },
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['courts'] }),
  
  
    Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Court is updated",
              showConfirmButton: false,
              timer: 1500})
  
  }
  });
};

export default useUpdateCourt
