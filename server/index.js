import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import cookieParser from "cookie-parser";
import verifyToken from "./middlewares/verifyToken.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentsRoute);
app.use("/images", express.static(path.join(__dirname, "/images")));

// Upload img
const storage = multer.diskStorage({
  destination: (req, file, func) => {
    func(null, "images");
  },
  filename: (req, file, func) => {
    func(null, req.body.img);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded.");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at ${process.env.PORT}`);
});
