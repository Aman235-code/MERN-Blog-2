import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirm) return;

    try {
      const { data } = await axios.delete(`/api/blog/delete/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition">
      <th className="px-4 py-3 text-left text-gray-400">{index}</th>
      <td className="px-4 py-3 text-gray-200 font-medium">{title}</td>
      <td className="px-4 py-3 text-gray-400 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-4 py-3 max-sm:hidden">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isPublished
              ? "bg-green-900 text-green-400"
              : "bg-orange-900 text-orange-400"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-2 items-center">
        <button
          onClick={togglePublish}
          className={`text-xs font-medium px-3 py-1 rounded-full transition ${
            isPublished
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={deleteBlog}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-700 hover:bg-red-600 transition"
        >
          <img src={assets.cross_icon} className="w-4" alt="delete" />
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
