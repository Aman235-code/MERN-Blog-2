import React from "react";

const Loader = () => {
  return  (
    <div className="mx-auto max-w-4xl px-6 py-20 animate-pulse">
      {/* Image */}
      <div className="h-72 w-full rounded-2xl bg-gray-800 mb-8" />

      {/* Category */}
      <div className="h-5 w-28 rounded-full bg-gray-800 mb-4" />

      {/* Title */}
      <div className="space-y-3 mb-6">
        <div className="h-7 w-full rounded bg-gray-800" />
        <div className="h-7 w-4/5 rounded bg-gray-800" />
      </div>

      {/* Meta */}
      <div className="h-4 w-40 rounded bg-gray-800 mb-10" />

      {/* Content */}
      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-11/12 rounded bg-gray-800" />
        <div className="h-4 w-10/12 rounded bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-800" />
        <div className="h-4 w-9/12 rounded bg-gray-800" />
      </div>
    </div>
  );
};


export default Loader;
