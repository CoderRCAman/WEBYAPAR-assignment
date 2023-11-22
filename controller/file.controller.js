import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import File from "../model/file.js";
import User from "../model/user.js";

const uploadImage = async (req, res) => {
  const form = new IncomingForm({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,
  });
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.log(err);
        return res.status(400).json({
          msg: "Pailed to parse the image",
        });
      }
      console.log(files);
      const file = files.image[0];
      const result = await cloudinary.v2.uploader.upload(file.filepath, {});
      console.log(result);
      const newImage = new File({
        asset_id: result.asset_id,
        original_filename: result.original_filename,
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
      const savedImage = await newImage.save();
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          images: savedImage._id,
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Failed to upload image" });
    }
  });
};

export { uploadImage };
