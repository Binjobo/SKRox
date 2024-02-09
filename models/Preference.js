// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const preferenceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ageRange: {
    type: Object,
    required: true,
  },
  heightRange: {
    type: Object,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
});

module.exports = model("Preference", preferenceSchema);
