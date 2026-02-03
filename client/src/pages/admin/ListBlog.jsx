/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gray-900 text-gray-200">
      <h1 className="text-2xl font-semibold mb-4 text-white">All Blogs</h1>

      <div className="relative mt-4 max-w-5xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-gray-800 border border-gray-700">
        <table className="w-full text-sm text-gray-200">
          <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
            <tr>
              <th scope="col" className="px-3 py-3 xl:px-6">#</th>
              <th scope="col" className="px-3 py-3">Blog Title</th>
              <th scope="col" className="px-3 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-3 py-3 max-sm:hidden">Status</th>
              <th scope="col" className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
