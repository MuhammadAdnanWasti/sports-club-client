import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useCourts from "../hooks/adminCourts/useCourts";

const Overview = () => {
  const { data: courts = [] } = useCourts();
  console.log(courts);

  return (
    <div className="w-full h-96 bg-base-100 p-4 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Court Pricing Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={courts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Show court prices */}
          <Bar dataKey="price" fill="#76b38f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;
