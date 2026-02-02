import fs from "fs";
import imageKit from "../config/imageKit.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const base64File = fileBuffer.toString("base64");

    const response = await imageKit.upload({
      file: fileBuffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "blogs",
    });

    const image = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    console.log(image);

    console.log(title, subTitle, description, category, image, isPublished);

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
    console.error(error);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
