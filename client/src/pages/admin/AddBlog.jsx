/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subtitle);
      formData.append("description", quillRef.current.root.innerHTML);
      formData.append("category", category);
      formData.append("isPublished", isPublished);
      formData.append("file", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        setImage(null);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!title) return toast.error("Please enter the title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gray-900 text-gray-300 h-full overflow-y-auto p-6 sm:p-10"
    >
      <div className="bg-gray-800 max-w-3xl w-full p-6 sm:p-10 mx-auto rounded-2xl shadow-lg">
        {/* Thumbnail Upload */}
        <p className="text-gray-200 font-medium">Upload Thumbnail</p>
        <label htmlFor="image" className="block mt-2 cursor-pointer">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            className="h-20 object-cover rounded-lg border border-gray-700 hover:scale-105 transition"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Title */}
        <p className="mt-4 text-gray-200 font-medium">Blog Title</p>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 rounded border border-gray-700 bg-gray-900 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Subtitle */}
        <p className="mt-4 text-gray-200 font-medium">Sub Title</p>
        <input
          type="text"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subtitle}
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 rounded border border-gray-700 bg-gray-900 outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Description / Quill Editor */}
        <p className="mt-4 text-gray-200 font-medium">Blog Description</p>
        <div className="relative  max-w-full h-80 mt-2 border border-gray-700 rounded-lg overflow-hidden shadow-sm bg-white">
          {/* Quill Editor */}
          <div ref={editorRef} className="h-full p-2 text-black"></div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Generate with AI Button */}
          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="absolute bottom-3 right-3 text-xs text-white bg-primary px-3 py-1.5 rounded shadow hover:brightness-110 transition"
          >
            Generate with AI
          </button>
        </div>

        {/* Category & Publish */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <p className="text-gray-200 font-medium">Blog Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="mt-10 px-3 py-2 rounded border border-gray-700 bg-gray-900 text-gray-300 outline-none focus:ring-2 focus:ring-primary"
            >
              {blogCategories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-8 sm:mt-0">
            <input
              type="checkbox"
              checked={isPublished}
              className="mt-16 scale-125 cursor-pointer"
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <p className="mt-16 text-gray-200 font-medium">Publish Now</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-6 w-full sm:w-40 h-10 bg-primary text-white rounded-lg hover:brightness-110 transition"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
