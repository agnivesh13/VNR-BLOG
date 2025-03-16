const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");
const cors = require("cors");

app.use(cors());
const port = process.env.PORT || 4000;

// Database connection
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB connection success");
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  })
  .catch((err) => {
    console.error("Error in DB connection:", err);
    process.exit(1); // Exit process on DB connection failure
  });

app.use(express.json());
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// Error handler
app.use((err, req, res, next) => {
  console.error("Error in express error handler:", err);
  res.status(500).json({ message: "Internal Server Error" });
});
