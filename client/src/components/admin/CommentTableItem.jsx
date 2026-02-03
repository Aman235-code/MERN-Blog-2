import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (!confirm) return;

      const { data } = await axios.delete(`/api/admin/delete-comment/${_id}`);
      data.success ? toast.success(data.message) : toast.error(data.message);
      fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition">
      {/* Blog and Comment Details */}
      <td className="px-6 py-4 max-w-sm">
        <div className="flex flex-col gap-1">
          <span className="text-gray-300 font-medium">
            Blog: <span className="text-gray-100">{blog.title}</span>
          </span>
          <span className="text-gray-300 font-medium">
            Name: <span className="text-gray-100">{comment.name}</span>
          </span>
          <span className="text-gray-300 font-medium">
            Comment: <span className="text-gray-100">{comment.content}</span>
          </span>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4 max-sm:hidden text-gray-400">
        {BlogDate.toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              className="bg-green-600 text-white rounded-full p-1.5 hover:scale-110 transition"
              title="Approve Comment"
            >
              <img src={assets.tick_icon} className="w-4" alt="Approve" />
            </button>
          ) : (
            <span className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </span>
          )}

          <button
            onClick={deleteComment}
            className="bg-red-600 text-white rounded-full p-1.5 hover:scale-110 transition"
            title="Delete Comment"
          >
            <img src={assets.bin_icon} className="w-4" alt="Delete" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
