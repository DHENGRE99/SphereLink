const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const postRoutes =
require("./routes/postRoutes");

const userRoutes =
require("./routes/userRoutes");

const commentRoutes =
require("./routes/commentRoutes");

const followRoutes = require("./routes/followRoutes");

const likeRoutes = require("./routes/likeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/likes", likeRoutes);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 SphereLink Server Running`);
  console.log(`👉 Local URL: http://localhost:${PORT}`);
  console.log(`👉 API Test: http://localhost:${PORT}/api/users`);
});