import express from "express";
import {
  handleLogin,
  handleSignup,
  logout,
  renderLogin,
  renderSignup,
} from "../controller/auth.controller.js";
import { isAuth, isNotAuth } from "../middleware/index.js";
const router = express.Router();

router.route("/login").get(isNotAuth, renderLogin).post(handleLogin);
router.route("/signup").get(isNotAuth, renderSignup).post(handleSignup);
router.route("/logout").get(logout);

export default router;
