import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-14">
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 disabled:opacity-40 hover:border-primary hover:text-primary transition"
      >
        Prev
      </button>

      {/* Numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full border text-sm font-medium transition
              ${
                currentPage === page
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                  : "border-gray-800 bg-gray-950 text-gray-400 hover:border-primary hover:text-primary"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 disabled:opacity-40 hover:border-primary hover:text-primary transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
