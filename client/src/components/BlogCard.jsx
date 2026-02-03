import React from "react";
import { useNavigate } from "react-router-dom";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  const cleanText = stripHtml(description || "");
  const shortDesc =
    cleanText.length > 150
      ? cleanText.slice(0, 150) + "..."
      : cleanText;

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl
                 border border-gray-800 bg-gray-950/90
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover
                     transition-transform duration-500
                     group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="mb-3 inline-block rounded-full
                         bg-primary/15 px-3 py-1
                         text-xs font-medium text-primary">
          {category}
        </span>

        <h3 className="mb-2 text-justify font-semibold text-gray-100 line-clamp-2">
          {title}
        </h3>

        <p
          className="text-sm leading-relaxed text-justify text-gray-400"
          dangerouslySetInnerHTML={{ __html: shortDesc }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
