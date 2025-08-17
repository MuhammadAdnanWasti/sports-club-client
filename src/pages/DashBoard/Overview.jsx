import React from 'react'
import useRole from '../hooks/role/useRole'
import useCourts from '../hooks/adminCourts/useCourts';
import useMembers from '../hooks/adminCourts/useMembers ';
import useRegularUsers from '../hooks/adminCourts/useRegularUsers';
import { BarChart, LineChart } from 'lucide-react';
import { Bar, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';

const Overview = () => {
    const [role, isRole] = useRole()
     const { data: courts=[] } = useCourts();
    const { data: members = []} = useMembers();
  const {
    data: users = []
  } = useRegularUsers();
//   console.log(users[1].email)
  return (
    <div>
     
 <LineChart width={600} height={300} data={users}>
                    
                <CartesianGrid />
    <Line dataKey='_id' />
    <XAxis dataKey="displayName" />
    <YAxis />
    
                  </LineChart>


    </div>
  )
}

export default Overview
