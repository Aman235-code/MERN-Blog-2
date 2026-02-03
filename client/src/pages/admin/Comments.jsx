/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("");
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) => {
    if (!filter) return true;
    return filter === "Approved" ? comment.isApproved : !comment.isApproved;
  });

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gray-900 text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl mb-4">
        <h1 className="text-2xl font-semibold text-white">Comments</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["Approved", "Not Approved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1 rounded-full text-xs font-medium border ${
                filter === status
                  ? "bg-primary text-white"
                  : "text-gray-400 border-gray-600"
              } transition hover:brightness-110`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Comments Table */}
      <div className="relative max-w-4xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-gray-800 border border-gray-700">
        <table className="w-full text-sm text-gray-200">
          <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">
                Blog & Comment
              </th>
              <th scope="col" className="px-4 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
