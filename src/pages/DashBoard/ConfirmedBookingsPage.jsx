import React from 'react'
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import {  useQuery } from '@tanstack/react-query';
const ConfirmedBookingsPage = () => {
 const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: bookings = [], isPending } = useQuery({
    queryKey: ['confirmed-bookings', user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?user=${user.email}&status=confirmed`);
      return res.data;
    }
  });

  

  if (isPending) return <p>Loading confirmed bookings...</p>;

  

  return (
    <section className="px-6 py-12 lg:px-20 text-black">
      <h2 className="text-3xl font-bold mb-6">My Confirmed Bookings     </h2>
      {bookings.length ? (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="card bg-base-100 shadow p-4">
              <h3 className="font-semibold">Court: {b.court_type}</h3>
             
              <p>Total Price: ৳{b.
total_price}</p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No pending bookings.</p>
      )}
    </section>
  );
}

export default ConfirmedBookingsPage
