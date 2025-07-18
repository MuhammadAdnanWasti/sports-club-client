import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useDeleteCourt = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/courts/${id}`);
      return data;
    },
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['courts'] }), 
   Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Court is successfully deleted",
            showConfirmButton: false,
            timer: 1500})




  }
  });
};

export default useDeleteCourt
