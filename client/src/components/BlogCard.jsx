import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="inline-block mb-3 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
          {category}
        </span>

        <h5 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-100">
          {title}
        </h5>

        <p
          className="text-xs leading-relaxed text-gray-400 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 120),
          }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
