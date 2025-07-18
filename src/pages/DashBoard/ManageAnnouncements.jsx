import React, { useState } from 'react'
import useAnnoucements from '../hooks/announcements/useAnnoucements';
import useCreateAnnouncement from '../hooks/announcements/useCreateAnnouncement';
import useUpdateAnnouncement from '../hooks/announcements/useUpdateAnnouncement';
import useDeleteAnnoucement from '../hooks/announcements/useDeleteAnnoucement';
import AnnouncementModal from './AnnouncementModal';
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
const ManageAnnouncements = () => {
  const { data: announcements, isPending, isError, error } = useAnnoucements();
  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnoucement();

  const [modalOpen, setModalOpen] = useState(false);
  const [editAnn, setEditAnn] = useState(null);

  const openAdd = () => { setEditAnn(null); setModalOpen(true); };
  const openEdit = (a) => { setEditAnn(a); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = (payload) => {
    if (editAnn) {
      updateAnnouncement.mutate({ id: editAnn._id, payload }, { onSuccess: closeModal });
    } else {
      createAnnouncement.mutate(payload, { onSuccess: closeModal });
    }
  };

  const handleDelete = (a) => {
    if (!window.confirm(`Delete announcement ${a.title}?`)) return;
    deleteAnnouncement.mutate(a._id);
  };

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold">Manage Announcements</h2>
          <button className="btn btn-primary" style={{ backgroundColor: brandColor, borderColor: brandColor }} onClick={openAdd}>
            + Add Announcement
          </button>
        </div>

        {isPending && <div className="py-20 text-center">Loading announcements...</div>}
        {isError && (
          <div className="alert alert-error mb-6"><span>Failed to load announcements: {error?.message}</span></div>
        )}

        {!isPending && !isError && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Display Window</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements?.length ? announcements.map((a) => (
                  <tr key={a._id}>
                    <td className="font-semibold">{a.title}</td>
                    <td className="max-w-xs truncate" title={a.message}>{a.message}</td>
                    <td className="text-sm">{fmtDateLocal(a.startDate)} → {fmtDateLocal(a.endDate)}</td>
                    <td>{a.active ? 'Active' : 'Inactive'}</td>
                    <td className="space-x-2">
                      <button className="btn btn-xs" onClick={() => openEdit(a)}>Edit</button>
                      <button className="btn btn-xs btn-error" onClick={() => handleDelete(a)} disabled={deleteAnnouncement.isPending}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center py-10">No announcements found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnnouncementModal open={modalOpen} onClose={closeModal} initialData={editAnn} onSubmit={handleModalSubmit} />
    </section>
  );
};

export default ManageAnnouncements
