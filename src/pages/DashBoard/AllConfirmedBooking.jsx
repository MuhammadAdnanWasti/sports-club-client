import React, { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllConfirmedBooking = () => {
    
  const axiosSecure = useAxiosSecure();
   const [search, setSearch] = useState('');
  const { data: bookingss = [], isPending } = useQuery({
    queryKey: ['confirmed-bookings'],
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?status=confirmed`);
      return res.data;
    }
  });

  
 const bookings = bookingss.filter((u) =>
    u.court_type.toLowerCase().includes(search.toLowerCase())
  );
  if (isPending) return <p>Loading confirmed bookings...</p>;

  
  return (
   <section className="px-6 py-12 lg:px-20 text-black">
      <h2 className="text-3xl font-bold mb-6 text-primary">All Confirmed Bookings     </h2>
      <div className="mb-4">
          <input
 type="text"  name='search' 


           
            placeholder="Search by name..."
            className="input input-bordered w-full text-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      {bookings.length ? (
        <div className="space-y-4 ">
          {bookings.map(b => (
            <div key={b._id} className="card bg-primary text-white shadow p-4">
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
  )
}

export default AllConfirmedBooking
