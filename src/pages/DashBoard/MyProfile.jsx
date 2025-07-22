import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useRole from '../hooks/role/useRole';
import useCourts from '../hooks/adminCourts/useCourts';
import useMembers from '../hooks/adminCourts/useMembers ';
import useRegularUsers from '../hooks/adminCourts/useRegularUsers';

const MyProfile = () => {
  const { user, loading } = useAuth(); 
   const { data: courts=[] } = useCourts();
    const { data: members = []} = useMembers();
  const {
    data: users = []
  } = useRegularUsers();
  //  console.log(courts)
  const axiosSecure = useAxiosSecure();
const [role, isRole] = useRole()
  // Don't run query until user exists
  const { isPending, isError, error, data: profile } = useQuery({
    queryKey: ['my-profile', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile: {error.message}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No profile data found.
      </div>
    );
  }

  return (
    <section className="px-6 py-12 lg:px-20 bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">My Profile</h2>

        <div className="card bg-base-200 shadow-xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-[#76b38f] ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img src={profile.photoURL || 'https://placehold.co/200x200?text=User'} alt="User" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <h3 className="text-2xl font-semibold text-[#76b38f]">{profile.displayName}</h3>
              <p className="text-lg"><span className="font-medium">Email:</span> {profile.email}</p>
         
              {profile.created_at && (
                <p className="text-lg">
                  <span className="font-medium">Registered:</span>{' '}
                  {new Date(profile.created_at).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
                </p>
              )}
              {  role==='member' && (profile.updated_at && (
                <p className="text-lg">
                  <span className="font-medium">Became  member:</span>{' '}
                  {new Date(profile.updated_at).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}
                </p>
              ))}
              {  role==='admin' && <>
              <p>Total Courts: {courts.length}</p>
              <p>Total Users: {users.length}</p>
              <p>Total members: {members.length}</p>
              </>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
