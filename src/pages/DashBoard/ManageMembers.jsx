import React, { useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useMembers from '../hooks/adminCourts/useMembers ';
const useDeleteUser = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.delete(`/users/${email}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(['members']);
    //   qc.invalidateQueries(['regular-users']);
       Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "This member is successfully deleted",
                 showConfirmButton: false,
                 timer: 1500}) 
    },
  });
};
const ManageMembers = () => {
  const { data: members = [], isLoading, isError, error } = useMembers();
  const [search, setSearch] = useState('');
  const deleteUser = useDeleteUser();

  const filtered = members.filter((u) =>
    u.displayName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading members...</p>;
  if (isError) return <p className="text-error">Error: {error.message}</p>;

  return (
    <section className="px-6 py-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-primary">Manage Members</h2>
        <div className="mb-4">
          <input
 type="text"  name='search' 


           
            placeholder="Search by name..."
            className="input input-bordered w-full text-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <p>No members found.</p>
        ) : (
          <ul className="space-y-4 text-white text-center">
            {filtered.map((u) => (
              <li key={u.email} className="card bg-primary p-4 flex justify-between items-center">
                <div >
                  <p className="font-semibold">{u.displayName}</p>
                  <p className="text-sm">{u.email}</p>
                </div>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteUser.mutate(u.email)}
                  disabled={deleteUser.isLoading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ManageMembers
