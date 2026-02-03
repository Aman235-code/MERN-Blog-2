import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/dataUri.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = req.body;

    if (!title || !description || !category || !isPublished) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let thumbnail = "";

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(fileUri, {
        folder: "QuickBlog/blogs",
      });

      thumbnail = uploadResult.secure_url;
    }

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: thumbnail,
      isPublished,
    });

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blog: id });

    return res.status(200).json({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return res.status(200).json({
      success: true,
      message: "Blog staus updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });

    return res.status(201).json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const generateContent = async (req, res) => {
  try {
    console.log("Here");
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format",
    );
    console.log(content);
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
