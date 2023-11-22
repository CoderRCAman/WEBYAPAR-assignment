import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("📔 Database connected");
  })
  .catch((err) => {
    console.log("Error DB connection", err);
  });
