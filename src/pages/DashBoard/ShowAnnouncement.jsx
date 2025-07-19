import React from 'react'
import useAnnoucements from '../hooks/announcements/useAnnoucements';
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
const ShowAnnouncement = () => {
    const { data: announcements, isPending, isError, error } = useAnnoucements();
  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto">
        
          <h2 className="text-4xl font-bold">All Announcements</h2>
   

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
                 
                </tr>
              </thead>
              <tbody>
                {announcements?.length ? announcements.map((a) => (
                  <tr key={a._id}>
                    <td className="font-semibold">{a.title}</td>
                    <td className="max-w-xs truncate" title={a.message}>{a.message}</td>
                    <td className="text-sm">{fmtDateLocal(a.startDate)} → {fmtDateLocal(a.endDate)}</td>
                    <td>{a.active ? 'Active' : 'Inactive'}</td>
                    
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center py-10">No announcements found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
    </section>
  )
}

export default ShowAnnouncement
