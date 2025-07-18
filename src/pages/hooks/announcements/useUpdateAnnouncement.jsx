import React from 'react'
import useAxiosSecure from '../useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const useUpdateAnnouncement = () => {
   const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosSecure.patch(`/announcements/${id}`, payload);
      return data;
    },
    onSuccess: () =>{ queryClient.invalidateQueries({ queryKey: ['announcements'] }),
  
    Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Announcement is updated",
                  showConfirmButton: false,
                  timer: 1500})
  }
  });
}

export default useUpdateAnnouncement
