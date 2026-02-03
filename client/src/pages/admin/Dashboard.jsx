/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 sm:p-10 bg-gray-900 text-gray-300">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          {
            icon: assets.dashboard_icon_1,
            label: "Blogs",
            value: dashboardData.blogs,
          },
          {
            icon: assets.dashboard_icon_2,
            label: "Comments",
            value: dashboardData.comments,
          },
          {
            icon: assets.dashboard_icon_3,
            label: "Drafts",
            value: dashboardData.drafts,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10" />
            <div>
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-gray-400 font-light">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4 text-gray-300 text-lg font-medium">
          <img
            src={assets.dashboard_icon_4}
            alt="Latest Blogs"
            className="w-6 h-6"
          />
          <span>Latest Blogs</span>
        </div>

        <div className="relative max-w-full overflow-x-auto shadow-lg rounded-xl bg-gray-800">
          <table className="w-full text-left text-gray-300 text-sm">
            <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3 max-sm:hidden">Date</th>
                <th className="px-3 py-3 max-sm:hidden">Status</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
