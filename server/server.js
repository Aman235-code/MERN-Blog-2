import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("APi is working");
});

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
});

// export default app;
