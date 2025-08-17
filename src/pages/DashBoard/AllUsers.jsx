import React, { useState } from 'react'
import useRegularUsers from '../hooks/adminCourts/useRegularUsers';

 const AllUsers = () => {
  const { data: users = [], isLoading, isError, error } = useRegularUsers();
  const [search, setSearch] = useState('');
  

  const filtered = users.filter((u) =>
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-error">Error: {error.message}</p>;

  return (
    <section className="px-6 py-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-primary">All Users</h2>
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
          <p>No users found.</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((u) => (
              <li key={u.email} className="card bg-primary p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{u.displayName}</p>
                  <p className="text-sm">{u.email}</p>
                  <p className="text-xs opacity-70">Role: {u.role}</p>
                </div>
               
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AllUsers
