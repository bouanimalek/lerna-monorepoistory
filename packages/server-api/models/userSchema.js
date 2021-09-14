const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true, required: true },
    password: String,
    avatar: {
      type: String,
      default: "http://localhost:4000/public/avatar/1627984018755.jpg",
    },
    address: String,
    role: { type: String, default: "user" },
    phone: String,
    birthDate: Date,
    events: [{ type: Schema.Types.ObjectId, ref: "Events" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
