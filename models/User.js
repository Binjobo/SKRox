const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
      max: 165,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    genderInterest: {
      type: String,
    },
    about: {
      type: String,
    },
    url: {
      type: String,
    },
    matches: [
      {
        user_id: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);
