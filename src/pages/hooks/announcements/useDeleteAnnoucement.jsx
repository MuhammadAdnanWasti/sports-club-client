import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useDeleteAnnoucement = () => {
   const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/announcements/${id}`);
      return data;
    },
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['announcements'] }),
  
  
    Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Announcement is successfully deleted",
                  showConfirmButton: false,
                  timer: 1500})
  }
  });
}

export default useDeleteAnnoucement
