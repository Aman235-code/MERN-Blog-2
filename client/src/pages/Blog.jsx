/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/blog/comments/${id}`);
      if (data.success) setComments(data.comments);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative text-gray-300">
      <Navbar />

      {/* Header */}
      <div className="text-center mt-20 px-4">
        <p className="text-primary text-sm font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do, YYYY")}
        </p>

        <h1 className="mt-4 text-3xl sm:text-5xl font-semibold max-w-3xl mx-auto text-gray-100">
          {data.title}
        </h1>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">{data.subTitle}</p>

        <span className="inline-block mt-6 px-4 py-1 text-xs rounded-full bg-primary/15 text-primary">
          By Aman Ahamed
        </span>
      </div>

      {/* Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-14">
        <img
          src={data.image}
          className="rounded-3xl mb-10 w-auto m-auto object-cover shadow-lg"
        />

        <div
          className="rich-text max-w-3xl text-justify mx-auto text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comments */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="font-semibold text-lg mb-6">
            Comments ({comments.length})
          </h3>

          <div className="flex flex-col gap-5">
            {comments.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-950/70 p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} className="w-6" />
                  <p className="font-medium text-gray-200">{item.name}</p>
                  <span className="text-xs text-gray-500 ml-auto">
                    {Moment(item.createdAt).fromNow()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 ml-9">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add comment */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="font-semibold mb-4">Leave a comment</h3>

          <form onSubmit={addComment} className="flex flex-col gap-4 max-w-lg">
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-950 border border-gray-800 rounded p-3 outline-none focus:border-primary"
            />

            <textarea
              placeholder="Write your thoughts..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-950 border border-gray-800 rounded p-3 h-40 outline-none focus:border-primary"
            />

            <button
              type="submit"
              className="self-start bg-primary px-8 py-2 rounded text-white hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share */}
        {/* <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Share this post</p>
          <div className="flex gap-4">
            {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map(
              (icon, i) => (
                <img
                  key={i}
                  src={icon}
                  className="w-10 cursor-pointer hover:scale-110 transition"
                />
              )
            )}
          </div>
        </div> */}
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
