import "dotenv/config";
import express from "express";
import "./db/index.js";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/index.js";
import "./cloudinary/index.js"; //set up cloudinary config
import AuthRoutes from "./routes/auth.routes.js";
import HomeRoutes from "./routes/home.routes.js";
import FileRoutes from "./routes/file.routes.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", HomeRoutes, AuthRoutes, FileRoutes);
app.listen(PORT, () => {
  console.log("🔥 server up and running at", PORT);
});
