const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    from_userId: {
      type: String,
      ref: "User",
    },
    to_userId: {
      type: String,
      ref: "User",
    },
    message: {
      type: String,
    },
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

module.exports = model("Message", messageSchema);
