import express from "express";

import { isAuth } from "../middleware/index.js";
import { uploadImage } from "../controller/file.controller.js";
const router = express.Router();

router.route("/upload").post(isAuth, uploadImage);
export default router;
