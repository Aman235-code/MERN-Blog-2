import express from "express";
import {
  addBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blogController.js";
import { singleUpload } from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", auth, singleUpload, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete", auth, deleteBlogById);
blogRouter.post("/toggle", auth, togglePublish);

export default blogRouter;
