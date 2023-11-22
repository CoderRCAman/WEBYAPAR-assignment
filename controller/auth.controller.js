import { IncomingForm } from "formidable";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
const jwt_secret = process.env.jwt_secret;
const renderLogin = (req, res) => {
  return res.render("login.ejs", {
    msg: "",
    error: "",
  });
};
const renderSignup = (req, res) => {
  return res.render("signup.ejs", { error: "", msg: "" });
};

const handleLogin = async (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  const form = new IncomingForm({
    multiples: false,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.render("login.ejs", {
        error: "Failed to parse form data",
        msg: "",
      });
    }
    const email = fields.email[0];
    const password = fields.password[0];
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login.ejs", {
        error: "No such user exists",
        msg: "",
      });
    }
    const isPasswordOk = await user.isValidatedPassword(password);
    if (!isPasswordOk) {
      return res.render("login.ejs", {
        error: "Password didnot match!",
        msg: "",
      });
    }
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const token = jwt.sign(payload, jwt_secret, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
    });
    return res.redirect("/");
  });
};

const handleSignup = async (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  const form = new IncomingForm({
    multiples: false,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.render("signup.ejs", {
        error: "Failed to parse form data",
        msg: "",
      });
    }
    const email = fields.email[0];
    const password = fields.password[0];
    const name = fields.name[0];
    if (!email || !password || !name) {
      return res.render("signup.ejs", {
        error: "Missing email or password or name",
        msg: "",
      });
    }
    try {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.render("signup.ejs", {
          error: "Provided email already exist!",
          msg: "",
        });
      }
      const newUser = new User({ email, password, name });
      await newUser.save();
      return res.render("signup.ejs", {
        error: "",
        msg: "Signup success please login to your account.",
      });
    } catch (error) {
      console.log(error);
      return res.render("signup.ejs", {
        msg: "",
        error: "Try again! Something went wrong",
      });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "ok" });
};

export { renderLogin, renderSignup, handleLogin, handleSignup, logout };
