import jwt from "jsonwebtoken";
const jwt_secret = process.env.jwt_secret;
export async function isAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const payload = jwt.verify(token, jwt_secret);
    req.user = payload;
    return next();
  } catch (error) {
    return res.redirect("/login");
  }
}

export async function isNotAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const payload = jwt.verify(token, jwt_secret);
    req.user = payload;
    return res.redirect("/");
  } catch (error) {
    return next();
  }
}
