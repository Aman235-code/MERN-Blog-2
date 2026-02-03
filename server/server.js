import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();

app.use(
  cors({
    origin: [
      "https://postly-topaz.vercel.app",
      // "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("APi is working");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});

export default app;
