import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    original_filename: {
      type: String,
      required: true,
    },
    asset_id: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("file", fileSchema);
export default File;
