const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.DBURL)
  .then(() => console.log("DB connection success"))
  .catch((err) => {
    console.error("Error in DB connection:", err);
    process.exit(1); // Exit process on DB connection failure
  });

// Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// Error handler
app.use((err, req, res, next) => {
  console.error("Error in express error handler:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Export app for Vercel
module.exports = app;
