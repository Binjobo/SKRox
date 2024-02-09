// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  profilePhotoUrl: {
    type: String,
    required: true,
  },
});

module.exports = model("Profile", profileSchema);
