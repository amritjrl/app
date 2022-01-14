const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", UserSchema);
