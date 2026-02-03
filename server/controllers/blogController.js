import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/dataUri.js";

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
