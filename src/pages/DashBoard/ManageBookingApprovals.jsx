import React from 'react'
import usePendingBookings from '../hooks/bookingCourts/usePendingBookings';
import useApproveBooking from '../hooks/bookingCourts/useApproveBooking';
import useRejectBooking from '../hooks/bookingCourts/useRejectBooking';

const ManageBookingApprovals = () => {
  const { data: bookings = [], isLoading, isError, error } = usePendingBookings();
  const approve = useApproveBooking();
  const reject = useRejectBooking();

  if (isLoading) return <p className="text-center py-20">Loading booking requests...</p>;
  if (isError) return <p className="text-center text-red-500 py-20">Error: {error.message}</p>;

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Manage Booking Approvals</h2>
        {bookings.length ? (
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Court</th>
                  <th> Dates</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.user_email}</td>
                    <td>{b.court_type}</td>
                    <td>
                      {b.date}
                    </td>
                    <td>৳{b.total_price}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => approve.mutate(b._id)}
                        disabled={approve.isLoading}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => reject.mutate(b._id)}
                        disabled={reject.isLoading}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No pending booking requests.</p>
        )}
      </div>
    </section>
  );
};


export default ManageBookingApprovals
