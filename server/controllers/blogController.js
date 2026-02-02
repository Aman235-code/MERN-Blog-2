import fs from "fs";
import imageKit from "../config/imageKit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
        {
          width: "1280",
        },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};
