const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("database connected successfully");
  } catch (error) {
    console.error(error);
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", require("./routes/authRouter.js"));
app.use("/api/users", require("./routes/userRouter.js"));
app.use("/api/issues", require("./routes/issueRouter.js"));
app.use("/api/comments", require("./routes/commentRouter.js"));
app.use(express.static(path.join(__dirname, "client", "dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(5000, () => {
  connectDB();
  console.log("listening on port 5000");
});
