import React from 'react'
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: bookings = [], isPending } = useQuery({
    queryKey: ['pending-bookings', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?user=${user.email}&status=pending`);
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      // optimistic remove
      // refetch
      queryClient.invalidateQueries(['pending-bookings', user.email]),
       Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your booking is successfully deleted",
                    showConfirmButton: false,
                    timer: 1500})
    }
  });

  if (isPending) return <p>Loading pending bookings...</p>;

  return (
    <section className="px-6 py-12 lg:px-20 text-black">
      <h2 className="text-3xl font-bold mb-6">My Pending Bookings     </h2>
      {bookings.length ? (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="card bg-base-100 shadow p-4">
              <h3 className="font-semibold">Court: {b.court_type}</h3>
             
              <p>Total Price: ৳{b.
total_price}</p>
              <button className="btn btn-sm btn-error mt-2" onClick={() => deleteMutation.mutate(b._id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending bookings.</p>
      )}
    </section>
  );
};

export default PendingBookings
