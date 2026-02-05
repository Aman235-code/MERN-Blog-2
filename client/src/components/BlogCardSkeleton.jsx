import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div
      className="overflow-hidden rounded-2xl
                 border border-gray-800 bg-gray-950/90
                 animate-pulse"
    >
      {/* Image skeleton */}
      <div className="h-52 w-full bg-gray-800" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-5 w-24 rounded-full bg-gray-800" />

        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-5/6 rounded bg-gray-800" />

        <div className="space-y-2 pt-2">
          <div className="h-3 w-full rounded bg-gray-800" />
          <div className="h-3 w-11/12 rounded bg-gray-800" />
          <div className="h-3 w-4/6 rounded bg-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
