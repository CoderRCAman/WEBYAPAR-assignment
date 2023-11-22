import express from "express";
import { renderHome } from "../controller/home.controller.js";
import { isAuth } from "../middleware/index.js";
const router = express.Router();

router.route("/").get(isAuth, renderHome);

export default router;
