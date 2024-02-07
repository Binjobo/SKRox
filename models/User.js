const { Schema, model } = require("mongoose");
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
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    isPrivate: {
      type: Boolean,
    },
    //reference to entry.js file and entrySchema
    entry: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
    //reference to favourite.js and favouriteSchema
    favourite: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favourite",
      },
    ],
    //reference to plan.js and planSchema
    plan: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plan",
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
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);
