import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not valid email`,
      },
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: [3, "Too short password"],
      required: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "file",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//vadlidate the password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
  try {
    return await bcrypt.compare(usersendPassword, this.password);
  } catch (err) {
    console.log(err);
    return false;
  }
};
const User = mongoose.model("user", userSchema);
export default User;
