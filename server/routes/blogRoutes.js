import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import { singleUpload } from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", auth, singleUpload, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete/:id", auth, deleteBlogById);
blogRouter.post("/toggle", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments", getBlogComments);

export default blogRouter;
