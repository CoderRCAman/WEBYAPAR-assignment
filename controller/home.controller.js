import User from "../model/user.js";
export async function renderHome(req, res) {
  const { email, name, _id } = req.user;
  const userData = await User.findById(_id).populate("images");
  const images = {
    column_one: [],
    column_two: [],
    column_three: [],
  };
  const userImages = userData.images;
  for (let i = 0; i < userImages.length; i++) {
    images.column_one.push(userImages[i++]);
    if (i < userImages.length) images.column_two.push(userImages[i++]);
    if (i < userImages.length) images.column_three.push(userImages[i]);
  }

  res.render("home.ejs", {
    name: name,
    email: email,
    _id: _id,
    images: images,
  });
}
