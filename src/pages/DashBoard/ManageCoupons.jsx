import React, { useState } from 'react'
import CouponModal from './CouponModal';
import useCoupons from '../hooks/cupons/useCoupons';
import useCreateCoupon from '../hooks/cupons/useCreateCoupon';
import useUpdateCoupon from '../hooks/cupons/useUpdateCoupon';
import useDeleteCoupon from '../hooks/cupons/useDeleteCoupon';
const brandColor = '#76b38f';
const fmtDateLocal = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};
const ManageCoupons = () => {
  const { data: coupons, isPending, isError, error } = useCoupons();
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();

  const [modalOpen, setModalOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);

  const openAdd = () => { setEditCoupon(null); setModalOpen(true); };
  const openEdit = (c) => { setEditCoupon(c); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = (payload) => {
    if (editCoupon) {
      updateCoupon.mutate({ id: editCoupon._id, payload }, { onSuccess: closeModal });
    } else {
      createCoupon.mutate(payload, { onSuccess: closeModal });
    }
  };

  const handleDelete = (c) => {
    if (!window.confirm(`Delete coupon ${c.code}?`)) return;
    deleteCoupon.mutate(c._id);
  };

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Manage Coupons</h2>
          <button className="btn btn-primary" style={{ backgroundColor: brandColor, borderColor: brandColor }} onClick={openAdd}>
            + Add Coupon
          </button>
        </div>

        {isPending && <div className="py-20 text-center">Loading coupons...</div>}
        {isError && (
          <div className="alert alert-error mb-6"><span>Failed to load coupons: {error?.message}</span></div>
        )}

        {!isPending && !isError && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Discount</th>
                  <th>Validity</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                      <td>{c.description || '—'}</td>
                      <td>{discLabel}</td>
                      <td className="text-sm">{validity}</td>
                      <td>{status}</td>
                      <td className="space-x-2">
                        <button className="btn btn-xs" onClick={() => openEdit(c)}>Edit</button>
                        <button className="btn btn-xs btn-error" onClick={() => handleDelete(c)} disabled={deleteCoupon.isPending}>Delete</button>
                      </td>
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

      <CouponModal open={modalOpen} onClose={closeModal} initialData={editCoupon} onSubmit={handleModalSubmit} />
    </section>
  );
};

export default ManageCoupons
