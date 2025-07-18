import React from 'react'
import useCoupons from '../hooks/cupons/useCoupons';
const fmtDateLocal = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};
const Coupon = () => {
      const { data: coupons, isPending, isError, error } = useCoupons();
  return (
   <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
       
          <h2 className="text-4xl font-bold">Manage Coupons</h2>
          
        

        {isPending && <div className="py-20 text-center">Loading coupons...</div>}
        {isError && (
          <div className="alert alert-error mb-6"><span>Failed to load coupons: {error?.message}</span></div>
        )}

        {!isPending && !isError && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-[90%]">
              <thead>
                <tr>
                  <th>Code</th>
                
                  <th>Discount</th>
                  <th>Validity</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {coupons?.length ? coupons.map((c) => {
                  const discLabel = c.discountType === 'percent' ? `${c.amount}%` : `৳${c.amount}`;
                  const validity = `${fmtDateLocal(c.startDate)} → ${fmtDateLocal(c.endDate)}`;
                  const status = c.active ? 'Active' : 'Inactive';
                  return (
                    <tr key={c._id}>
                      <td className="font-mono font-bold">{c.code}</td>
                     
                      <td>{discLabel}</td>
                      <td className="text-sm">{validity}</td>
                      <td>{status}</td>
                      
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={6} className="text-center py-10">No coupons found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
    </section>
  )
}

export default Coupon
