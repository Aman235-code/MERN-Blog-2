import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const baseLink =
    "group flex items-center gap-3 py-3 px-4 md:px-8 md:min-w-64 transition rounded-r-full";

  const activeLink =
    "bg-primary/15 text-primary border-l-4 border-primary";

  const inactiveLink =
    "text-gray-400 hover:bg-gray-800 hover:text-gray-200";

  return (
    <div className="flex flex-col min-h-screen pt-6 bg-gray-900 border-r border-gray-800">
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        <img
          src={assets.home_icon}
          className="w-5 opacity-80 group-hover:opacity-100"
          alt=""
        />
        <span className="hidden md:inline-block text-sm font-medium">
          Dashboard
        </span>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        <img
          src={assets.add_icon}
          className="w-5 opacity-80 group-hover:opacity-100"
          alt=""
        />
        <span className="hidden md:inline-block text-sm font-medium">
          Add Blog
        </span>
      </NavLink>

      <NavLink
        to="/admin/blogList"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        <img
          src={assets.list_icon}
          className="w-5 opacity-80 group-hover:opacity-100"
          alt=""
        />
        <span className="hidden md:inline-block text-sm font-medium">
          Blog List
        </span>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `${baseLink} ${isActive ? activeLink : inactiveLink}`
        }
      >
        <img
          src={assets.comment_icon}
          className="w-5 opacity-80 group-hover:opacity-100"
          alt=""
        />
        <span className="hidden md:inline-block text-sm font-medium">
          Comments
        </span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
