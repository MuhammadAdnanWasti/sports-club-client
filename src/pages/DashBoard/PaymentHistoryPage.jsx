import React, { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
const fmtDateTime = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' });
};

// Fetch payment history for current user
const usePaymentHistory = (email) => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['payment-history', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?user=${email}`);
      return res.data; // array of payment docs
    },
    staleTime: 60_000,
  });
};

const PaymentHistoryPage = () => {
  const { user } =useAuth()
  const { data: payments = [], isPending, isError, error } = usePaymentHistory(user?.email);
  // console.log(payments)
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  if (isPending) return <p className="text-center py-10">Loading payment history...</p>;
  if (isError) return <p className="text-center text-error py-10">Error: {error.message}</p>;

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Payment History</h2>
          <button
            className="btn btn-outline"
            onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
          >
            {viewMode === 'table' ? 'Card View' : 'Table View'}
          </button>
        </div>

        {payments.length === 0 ? (
          <p className="text-center">No payment records found.</p>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Amount</th>
               
                  <th>Transaction ID</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td className="font-mono text-sm">{p._id}</td>
                    <td>{p.email}</td>
                    <td>৳{p.amount}</td>
                  
                    <td className="font-mono text-sm">{p.transactionId}</td>
                    <td>{fmtDateTime(p.paid_at_string)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.map((p) => (
              <div key={p._id} className="card bg-base-200 shadow p-4">
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> <span className="font-mono text-sm">{p._id}</span></p>
                  <p><span className="font-medium">Email:</span> {p.email}</p>
                  <p><span className="font-medium">Amount:</span> ৳{p.amount}</p>
                  <p><span className="font-medium">Txn ID:</span> <span className="font-mono text-sm">{p.transactionId}</span></p>
                  <p><span className="font-medium">Paid At:</span> {fmtDateTime(p.paid_at_string)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentHistoryPage
