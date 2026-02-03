import express from "express";
import { addBlog } from "../controllers/blogController.js";
import { singleUpload } from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", auth, singleUpload, addBlog);

export default blogRouter;
