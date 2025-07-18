import React, { useState } from 'react'
import useCourts from '../hooks/adminCourts/useCourts';
import useCreateCourt from '../hooks/adminCourts/useCreateCourt';
import useUpdateCourt from '../hooks/adminCourts/useUpdateCourt';
import useDeleteCourt from '../hooks/adminCourts/useDeleteCourt';
import CourtModal from './CourtModal';
const ManageCourts = () => {
  const { data: courts, isPending, isError, error } = useCourts();
  const createCourt = useCreateCourt();
  const updateCourt = useUpdateCourt();
  const deleteCourt = useDeleteCourt();

  const [modalOpen, setModalOpen] = useState(false);
  const [editCourt, setEditCourt] = useState(null);

  const openAdd = () => {
    setEditCourt(null);
    setModalOpen(true);
  };
  const openEdit = (court) => {
    setEditCourt(court);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = (payload) => {
    if (editCourt) {
      updateCourt.mutate(
        { id: editCourt._id, payload },
        { onSuccess: closeModal }
      );
    } else {
      createCourt.mutate(payload, { onSuccess: closeModal });
    }
  };

  const handleDelete = (court) => {
    if (!window.confirm(`Delete ${court.type}?`)) return;
    deleteCourt.mutate(court._id);
  };

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Manage Courts</h2>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#76b38f', borderColor: '#76b38f' }}
            onClick={openAdd}
          >
            + Add Court
          </button>
        </div>

        {/* Loading */}
        {isPending && (
          <div className="text-center py-20">Loading courts...</div>
        )}

        {/* Error */}
        {isError && (
          <div className="alert alert-error mb-6">
            <span>Failed to load courts: {error?.message}</span>
          </div>
        )}

        {/* Table */}
        {!isPending && !isError && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Slots</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courts?.length ? (
                  courts.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img src={c.image} alt={c.type} />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{c.type}</td>
                      <td>
                        <details className="collapse collapse-arrow bg-base-200">
                          <summary className="collapse-title text-sm font-medium">
                            {c.slots?.length || 0} slot(s)
                          </summary>
                          <div className="collapse-content">
                            <ul className="list-disc ml-5 text-sm space-y-1">
                              {c.slots?.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      </td>
                      <td>৳{c.price}</td>
                      <td className="space-x-2">
                        <button
                          className="btn btn-xs"
                          onClick={() => openEdit(c)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleDelete(c)}
                          disabled={deleteCourt.isPending}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10">
                      No courts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <CourtModal
        open={modalOpen}
        onClose={closeModal}
        initialData={editCourt}
        onSubmit={handleModalSubmit}
      />
    </section>
  );
};

export default ManageCourts;
