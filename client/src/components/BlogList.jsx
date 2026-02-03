/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
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
      {visibleBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-28 mx-8 sm:mx-16 xl:mx-40">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
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
