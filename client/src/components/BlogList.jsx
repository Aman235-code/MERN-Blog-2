/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 6;

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!input) return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()),
    );
  };

  const visibleBlogs = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu,
  );

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [menu, input]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedBlogs = visibleBlogs.slice(startIndex, endIndex);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 sm:gap-6 my-12 relative">
        {blogCategories.map((item, idx) => (
          <div key={idx} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative px-4 py-1.5 text-sm rounded-full transition-colors duration-200
                ${
                  menu === item
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
            >
              {item}

              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 -z-10 bg-primary/90 rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      {paginatedBlogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-8 sm:mx-16 xl:mx-40">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination BELOW cards */}
          <Pagination
            totalPosts={visibleBlogs.length}
            postsPerPage={POSTS_PER_PAGE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        /* Empty State */
        <div className="text-center mb-20 text-gray-500 mt-20">
          <p className="text-sm">
            No posts here yet. New writing will appear soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
